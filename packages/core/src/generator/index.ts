import { resolveConfig } from '../config'
import type {
  ExtractorContext,
  GenerateOptions,
  ParsedUtil,
  ResolvedConfig,
  RuleContext,
  StyleUtil,
  UserConfig,
  UserConfigDefaults,
  UtilObject,
  Variant,
  VariantContext,
  VariantHandler,
  VariantHandlerContext,
  VariantMatchedResult,
} from '../types'
import type {
  CountableSet,
} from '../utils'
import {
  isCountableSet,
  isString,
  // notNull,
} from '../utils'

export class UnoGenerator<Theme extends object = object> {
  private _cache = new Map<string, StyleUtil<Theme> | null>()
  public config: ResolvedConfig<Theme>

  constructor(
    public userConfig: UserConfig<Theme> = {},
    public defaults: UserConfigDefaults<Theme> = {},
  ) {
    this.config = resolveConfig(userConfig)
  }

  applyExtractors(
    code: string,
    id?: string,
    extracted: Set<string> | CountableSet<string> = new Set<string>(),
  ): Set<string> | CountableSet<string> {
    const context: ExtractorContext = {
      original: code,
      code,
      id,
      extracted,
      envMode: this.config.envMode,
    }

    for (const extractor of this.config.extractors) {
      const result = extractor.extract?.(context)

      if (!result)
        continue

      if (isCountableSet(result) && isCountableSet(extracted)) {
        for (const token of result) {
          extracted.setCount(
            token,
            extracted.getCount(token) + result.getCount(token),
          )
        }
      }
      else {
        for (const token of result) extracted.add(token)
      }
    }

    return extracted
  }

  makeContext(raw: string, applied: VariantMatchedResult<Theme>): RuleContext<Theme> {
    const context: RuleContext<Theme> = {
      rawSelector: raw,
      currentSelector: applied[1],
      theme: this.config.theme,
      generator: this,
      variantHandlers: applied[2],
      variantMatch: applied,
    }
    return context
  }

  async parseToken(
    raw: string,
    alias?: string,
  ): Promise<StyleUtil<Theme> | undefined | null> {
    const cacheKey = `${raw}${alias ? ` ${alias}` : ''}`

    // use caches if possible
    if (this._cache.has(cacheKey))
      return this._cache.get(cacheKey)

    const applied = await this.matchVariants(raw)

    if (!applied) {
      this._cache.set(cacheKey, null)
      return
    }

    const context = this.makeContext(raw, [alias || applied[0], applied[1], applied[2], applied[3]])

    const parsed = await this.parseUtil(context.variantMatch, context)
    const utils = parsed && this.stylifyUtil(parsed, context)

    if (utils) {
      this._cache.set(cacheKey, utils)
      return utils
    }

    this._cache.set(cacheKey, null)
  }

  async generate(
    input: string | Set<string> | CountableSet<string> | string[],
    options: GenerateOptions<false> = {},
  ) {
    const { id } = options

    const tokens: Readonly<Set<string> | CountableSet<string>> = isString(input)
      ? this.applyExtractors(input, id)
      : Array.isArray(input)
        ? new Set<string>(input)
        : input

    const matched = new Set<string>()
    const sheet = new Set<StyleUtil<Theme>>()

    const tokenPromises = Array.from(tokens).map(async (raw: string) => {
      if (matched.has(raw))
        return

      const payload = await this.parseToken(raw)

      if (payload == null)
        return

      matched.add(raw)

      // for (const item of payload)
      sheet.add(payload)
    })

    await Promise.all(tokenPromises)

    const layerCache: Record<string, string> = {}
    const getLayer = (layer: string) => {
      if (layerCache[layer])
        return layerCache[layer]

      const css = Array.from(sheet).map(([, , body]) => {
        return body
      })

      return css
    }

    const getLayers = () => {
      return [''].map(i => getLayer(i) || '').filter(Boolean)
    }

    return {
      get css() {
        return getLayers()
      },
      get style() {
        return [''].map(i => getLayer(i) || '').filter(Boolean).reduce((pre, cur) => Object.assign(pre, ...cur), {})
      },
      matched,
      getLayers,
      getLayer,
    }
  }

  async matchVariants(
    raw: string,
  ): Promise<VariantMatchedResult<Theme>> {
    const variants = new Set<Variant<Theme>>()
    const handlers: VariantHandler[] = []

    let applied = true

    const context: VariantContext<Theme> = {
      rawSelector: raw,
      theme: this.config.theme,
      generator: this,
    }

    while (applied) {
      applied = false
      for (const v of this.config.variants) {
        if (!v.multiPass && variants.has(v))
          continue
        let handler = await v.match(raw, context)
        if (!handler)
          continue
        if (isString(handler)) {
          if (handler === raw)
            continue
          handler = { matcher: handler }
        }
        handlers.unshift(handler)
        variants.add(v)
        applied = true
        break
      }
      if (!applied)
        break

      if (handlers.length > 500)
        throw new Error(`Too many variants applied to "${raw}"`)
    }

    return [raw, raw, handlers, variants]
  }

  private applyVariants(
    parsed: ParsedUtil,
    variantHandlers = parsed[4],
    raw = parsed[1],
  ): UtilObject {
    const handler = variantHandlers.slice().sort((a, b) => ((a.order || 0) - (b.order || 0))).reduceRight(
      (previous, v) => (input: VariantHandlerContext) => {
        const entries = v.body?.(input.entries) || input.entries
        return (v.handle ?? defaultVariantHandler)({
          ...input,
          entries,
          selector: v.selector?.(input.selector, entries) || input.selector,
          sort: v.sort || input.sort,
        }, previous)
      },
      (input: VariantHandlerContext) => input,
    )

    const variantContextResult = handler({
      selector: raw,
      entries: parsed[2],
    })

    return {
      selector: variantContextResult.selector,
      entries: variantContextResult.entries,
      sort: variantContextResult.sort,
      noMerge: variantContextResult.noMerge,
    }
  }

  async parseUtil(
    input: string | VariantMatchedResult<Theme>,
    context: RuleContext<Theme>,
  ): Promise<ParsedUtil | undefined> {
    const [raw, processed, variantHandlers] = isString(input) ? await this.matchVariants(input) : input

    const staticMatch = this.config.rulesStaticMap[processed]
    if (staticMatch) {
      if (staticMatch[1]) {
        const index = staticMatch[0]
        const entry = staticMatch[1]
        const meta = staticMatch[2]
        return [index, raw, entry, meta, variantHandlers]
      }
    }

    context.variantHandlers = variantHandlers

    const { rulesDynamic } = this.config

    for (const [i, matcher, handler, meta] of rulesDynamic) {
      const match = processed.match(matcher)
      if (!match)
        continue

      const result = handler(match, context)
      if (!result)
        continue

      return [i, raw, result, meta, variantHandlers]
    }
  }

  stylifyUtil(
    parsed?: ParsedUtil,
    context?: RuleContext<Theme>,
  ): StyleUtil<Theme> | undefined {
    if (!parsed)
      return
    const { selector, entries, sort: variantSort, noMerge } = this.applyVariants(parsed)

    const { sort: metaSort, ...meta } = parsed[3] ?? {}
    const ruleMeta = {
      ...meta,
      sort: variantSort ?? metaSort,
    }
    return [parsed[0], selector, entries, ruleMeta, context, noMerge]
  }
}

export function createGenerator<Theme extends object = object>(
  config?: UserConfig<Theme>,
  defaults?: UserConfigDefaults<Theme>,
) {
  return new UnoGenerator<Theme>(config, defaults)
}

function defaultVariantHandler(input: VariantHandlerContext, next: (input: VariantHandlerContext) => VariantHandlerContext) {
  return next(input)
}
