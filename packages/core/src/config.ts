import { extractorSplit } from './extractors'
import type { Preset, PresetFactory, ResolvedConfig, Rule, ToArray, UserConfig, UserConfigDefaults } from './types'
import { clone, isStaticRule, mergeDeep, normalizeVariant, toArray, uniq, uniqueBy } from './utils'

const __RESOLVED = '_uno_resolved'

/**
 * Resolve a single preset, nested presets are ignored
 */
export function resolvePreset<Theme extends object = object>(presetInput: Preset<Theme> | PresetFactory<Theme, any>): Preset<Theme> {
  let preset = typeof presetInput === 'function' ? presetInput() : presetInput

  if (__RESOLVED in preset)
    return preset

  preset = { ...preset }

  Object.defineProperty(preset, __RESOLVED, {
    value: true,
    enumerable: false,
  })

  if (preset.prefix) {
    const apply = (i: Rule<Theme>) => {
      if (!i[2])
        i[2] = {}
      const meta = i[2]
      if (meta.prefix == null && preset.prefix)
        meta.prefix = toArray(preset.prefix)
    }
    preset.rules?.forEach(apply)
  }

  return preset
}

/**
 * Resolve presets with nested presets
 */
export function resolvePresets<Theme extends object = object>(preset: Preset<Theme> | PresetFactory<Theme, any>): Preset<Theme>[] {
  const root = resolvePreset(preset)
  if (!root.presets)
    return [root]
  const nested = (root.presets || []).flatMap(toArray).flatMap(resolvePresets)
  return [root, ...nested]
}

export function resolveConfig<Theme extends object = object>(
  userConfig: UserConfig<Theme> = {},
  defaults: UserConfigDefaults<Theme> = {},
): ResolvedConfig<Theme> {
  const config = Object.assign({}, userConfig, defaults) as UserConfigDefaults<Theme>
  const rawPresets = uniqueBy((config.presets || []).flatMap(toArray).flatMap(resolvePresets), (a, b) => a.name === b.name)

  const sortedPresets = [
    ...rawPresets.filter(p => p.enforce === 'pre'),
    ...rawPresets.filter(p => !p.enforce),
    ...rawPresets.filter(p => p.enforce === 'post'),
  ]

  const sources = [
    ...sortedPresets,
    config,
  ]

  function getMerged<T extends 'rules' | 'variants' | 'separators'>(key: T): ToArray<Required<UserConfig<Theme>>[T]> {
    return uniq(sources.flatMap(p => toArray(p[key] || []) as any[])) as any
  }

  const rules = getMerged('rules')
  const rulesStaticMap: ResolvedConfig<Theme>['rulesStaticMap'] = {}

  const rulesSize = rules.length

  const theme: Theme = mergeThemes(sources.map(p => p.theme))

  const rulesDynamic = rules.map((rule, i) => {
    if (isStaticRule(rule)) {
      const prefixes = toArray(rule[2]?.prefix || '')
      prefixes.forEach((prefix) => {
        rulesStaticMap[prefix + rule[0]] = [i, rule[1], rule[2], rule]
      })
      // delete static rules so we can't skip them in matching
      // but keep the order
      return undefined
    }
    return [i, ...rule]
  }).filter(Boolean)
    .reverse() as ResolvedConfig<Theme>['rulesDynamic']

  let separators = getMerged('separators')
  if (!separators.length)
    separators = [':', '-']

  const resolved: ResolvedConfig<any> = {
    ...config,
    theme,
    envMode: config.envMode ?? 'build',
    rulesSize,
    rulesDynamic,
    rulesStaticMap,
    variants: getMerged('variants').map(normalizeVariant).sort((a, b) => ((a.order || 0) - (b.order || 0))),
    extractors: [extractorSplit],
    separators,
  }

  return resolved
}

function mergeThemes<Theme extends object = object>(themes: (Theme | undefined)[]): Theme {
  return themes.map(theme => theme ? clone(theme) : {}).reduce<Theme>((a, b) => mergeDeep(a, b), {} as Theme)
}
