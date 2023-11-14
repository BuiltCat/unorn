import { CSSValue, Rule, RuleContext } from "@unocss-native/core";
import { Theme } from "../theme";
import { h } from "../utils/handlers";
import { borderDirectionMap } from "../utils/mappings";

const getAspectRatio = (prop: string) => {
    if (/^\d+\/\d+$/.test(prop))
        return prop

    switch (prop) {
        case 'square': return '1/1'
        case 'video': return '16/9'
        case 'auto': return 'auto'
    }

    return h.bracket(prop)
}

function handlerBorderWidth([, a = '', b]: string[], { theme }: RuleContext<Theme>): CSSValue | undefined {
    const v = theme.borderWidth?.[b || 'DEFAULT'] ?? h.bracket.number(b)
    const props: CSSValue = {}
    if (a in borderDirectionMap && v != null)
        borderDirectionMap[a].forEach(i => {
            props[`border${i}Width`] = v
        })
    return props
}

function handleInsetValue(s: string, v: string, { theme }: RuleContext<Theme>): string | number | undefined {
    return theme.spacing?.[v] ?? h.bracket.auto.fraction.number(v)
}
  
//   function handleInsetValues([, d, v]: string[], ctx: RuleContext): CSSValue | undefined {
//     const r = handleInsetValue(v, ctx)
//     if (r != null && d in insetMap)
//       return insetMap[d].map(i => [i.slice(1), r])
//   }
  

export const layout: Rule<Theme>[] = [

    // alignContent
    ['content-center', { alignContent: 'center' }],
    ['content-start', { alignContent: 'flex-start' }],
    ['content-end', { alignContent: 'flex-end' }],
    ['content-between', { alignContent: 'space-between' }],
    ['content-around', { alignContent: 'space-around' }],
    ['content-stretch', { alignContent: 'stretch' }],

    // alignItems
    ['items-start', { alignItems: 'flex-start' }],
    ['items-end', { alignItems: 'flex-end' }],
    ['items-center', { alignItems: 'center' }],
    ['items-baseline', { alignItems: 'baseline' }],
    ['items-stretch', { alignItems: 'stretch' }],

    // alignSelf
    ['self-auto', { alignSelf: 'auto' }],
    ['self-start', { alignSelf: 'flex-start' }],
    ['self-end', { alignSelf: 'flex-end' }],
    ['self-center', { alignSelf: 'center' }],
    ['self-stretch', { alignSelf: 'stretch' }],
    ['self-baseline', { alignSelf: 'baseline' }],

    // aspectRatio
    [/^aspect-(.+)$/, ([, d]: string[]) => ({ aspectRatio: getAspectRatio(d) })],

    // borderBottomWidth borderEndWidth borderLeftWidth borderRightWidth borderStartWidth borderTopWidth borderWidth
    [/^(?:border)()(?:-(.+))?$/, handlerBorderWidth],
    [/^(?:border)-([xylrtbse])(?:-(.+))?$/, handlerBorderWidth],

    // bottom
    [/^(-?)(top|left|right|bottom)-(.+)$/, ([, s, d, v], ctx) => ({ [d]: handleInsetValue(s, v, ctx) })],

    ['flex', { display: 'flex' }],

    // Flex Direction
    ['flex-row', { flexDirection: 'row' }],
    ['flex-row-reverse', { flexDirection: 'row-reverse' }],
    ['flex-col', { flexDirection: 'column' }],
    ['flex-col-reverse', { flexDirection: 'column-reverse' }],

    // Flex Wrap
    ['flex-wrap', { flexWrap: 'wrap' }],
    ['flex-wrap-reverse', { flexWrap: 'wrap-reverse' }],
    ['flex-nowrap', { flexWrap: 'nowrap' }],

    // zIndex
    [/^z([\d.]+)$/, ([, v]) => ({ zIndex: h.number(v) })],
    [/^z-(.+)$/, ([, v], { theme }: RuleContext<Theme>) => ({ zIndex: theme.zIndex?.[v] ?? h.bracket.auto.number(v) })],
]
