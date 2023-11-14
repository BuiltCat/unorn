import { extractorSplit } from "./extractors";
import { ResolvedConfig, ToArray, UserConfig, UserConfigDefaults } from "./types";
import { clone, isStaticRule, mergeDeep, toArray, uniq } from "./utils";

export function resolveConfig<Theme extends object = object>(
    userConfig: UserConfig<Theme> = {},
    defaults: UserConfigDefaults<Theme> = {}
): ResolvedConfig<Theme> {
    const config = Object.assign({}, userConfig, defaults) as UserConfigDefaults<Theme>
    
    const sources = [
        config
    ] 
    
    function getMerged<T extends 'rules'>(key: T): ToArray<Required<UserConfig<Theme>>[T]>{
        return uniq(sources.flatMap(p => toArray(p[key] || []) as any[])) as any
    }

    const rules = getMerged('rules')
    const rulesStaticMap: ResolvedConfig<Theme>['rulesStaticMap'] = {}

    const rulesSize = rules.length


    const theme: Theme = mergeThemes(sources.map(p => p.theme))

    const rulesDynamic = rules.map((rule, i) => {
        if(isStaticRule(rule)) {
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


    const resolved: ResolvedConfig<any> = {
        ...config,
        theme,
        envMode: config.envMode ?? 'build',
        rulesSize,
        rulesDynamic,
        rulesStaticMap,
        extractors: [extractorSplit]
    }

    return resolved
}


function mergeThemes<Theme extends object = object>(themes: (Theme | undefined)[]): Theme {
    return themes.map(theme => theme ? clone(theme) : {}).reduce<Theme>((a, b) => mergeDeep(a, b), {} as Theme)
  }