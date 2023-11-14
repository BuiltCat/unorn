import { resolveConfig } from "../config";
import {
  ExtractorContext,
  GenerateOptions,
  ResolvedConfig,
  RuleContext,
  UserConfig,
  UserConfigDefaults,
  ParsedUtil,
} from "../types";
import {
  CountableSet,
  isCountableSet,
  isString,
  notNull,
} from "../utils";

export class UnoGenerator<Theme extends object = object> {
  private _cache = new Map<string, ParsedUtil<Theme>[] | null>();
  public config: ResolvedConfig<Theme>;

  constructor(
    public userConfig: UserConfig<Theme> = {},
    public defaults: UserConfigDefaults<Theme> = {}
  ) {
    this.config = resolveConfig(userConfig);
  }

  applyExtractors(
    code: string,
    id?: string,
    extracted: Set<string> | CountableSet<string> = new Set<string>()
  ): Set<string> | CountableSet<string> {
    const context: ExtractorContext = {
      original: code,
      code,
      id,
      extracted,
      envMode: this.config.envMode,
    };

    for (const extractor of this.config.extractors) {
      const result = extractor.extract?.(context);

      if (!result) continue;

      if (isCountableSet(result) && isCountableSet(extracted)) {
        for (const token of result)
          extracted.setCount(
            token,
            extracted.getCount(token) + result.getCount(token)
          );
      } else {
        for (const token of result) extracted.add(token);
      }
    }

    return extracted;
  }

  makeContext(raw: string): RuleContext<Theme> {
    const context: RuleContext<Theme> = {
      rawSelector: raw,
      currentSelector: raw,
      theme: this.config.theme,
      generator: this,
    };
    return context;
  }

  parseToken(
    raw: string,
    alias?: string
  ): ParsedUtil<Theme>[] | undefined | null {
    const cacheKey = `${raw}${alias ? ` ${alias}` : ""}`;

    // use caches if possible
    if (this._cache.has(cacheKey)) return this._cache.get(cacheKey);

    const context = this.makeContext(raw);

    const utils = this.parseUtil(raw, context)?.filter(notNull);

    if (utils?.length) {
      this._cache.set(cacheKey, utils);
      return utils;
    }

    this._cache.set(cacheKey, null);
  }

  generate(
    input: string | Set<string> | CountableSet<string> | string[],
    options: GenerateOptions<false> = {}
  ) {
    const { id } = options;

    const tokens: Readonly<Set<string> | CountableSet<string>> = isString(input)
      ? this.applyExtractors(input, id)
      : Array.isArray(input)
        ? new Set<string>(input)
        : input;

    const matched = new Set<string>();
    const sheet = new Set<ParsedUtil<Theme>>();

    const run = (raw: string) => {
      if (matched.has(raw)) return;

      const payload = this.parseToken(raw);

      if (payload == null) return;

      matched.add(raw);

      for (const item of payload) {
        sheet.add(item)
      }
    }

    tokens.forEach(row => run(row));

    const layerCache: Record<string, string> = {};
    const getLayer = (layer: string) => {
      if (layerCache[layer]) return layerCache[layer];

      let css = Array.from(sheet).map(([, selector, body]) => {
        return body;
      });

      return css;
    };

    const getLayers = () => {
      return [""].map((i) => getLayer(i) || "").filter(Boolean);
    };

    return {
      get css() {
        return getLayers();
      },
      get style(){
        return [""].map((i) => getLayer(i) || "").filter(Boolean).reduce((pre, cur) => Object.assign(pre, ...cur), {})
      },
      matched,
      getLayers,
      getLayer,
    };
  }

  parseUtil(
    input: string,
    context: RuleContext<Theme>
  ): ParsedUtil<Theme>[] | undefined {
    const raw = input;
    const processed = input;

    const staticMatch = this.config.rulesStaticMap[processed];
    if (staticMatch) {
      if (staticMatch[1]) {
        const index = staticMatch[0];
        const entry = staticMatch[1];
        const meta = staticMatch[2];
        return [[index, raw, entry, meta, context]];
      }
    }

    const { rulesDynamic } = this.config;

    for (const [i, matcher, handler, meta] of rulesDynamic) {
      const match = processed.match(matcher);
      if (!match) continue;

      const result = handler(match, context);
      if (!result) continue;

      return [[i, raw, result, meta, context]];
    }
  }
}

export function createGenerator<Theme extends object = object>(
  config?: UserConfig<Theme>,
  defaults?: UserConfigDefaults<Theme>
) {
  return new UnoGenerator<Theme>(config, defaults);
}
