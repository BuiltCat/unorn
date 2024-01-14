import type { CSSObject, DynamicMatcher, Rule, RuleContext } from '@unocss-native/core'
import type { Theme } from '../theme'
import { h } from '../utils/handlers'
import { borderDirectionMap, directionMap, sizeMapping } from '../utils/mappings'
import { parseColor, transformColor } from '../utils/utilities'

type BorderProps = 'borderLeftWidth' | 'borderRightWidth'

function getAspectRatio(prop: string) {
  if (/^\d+\/\d+$/.test(prop))
    return prop

  switch (prop) {
    case 'square': return '1/1'
    case 'video': return '16/9'
    case 'auto': return 'auto'
  }

  return h.bracket(prop)
}

function handlerBorderWidth([, a = '', b]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  const v = theme.borderWidth?.[b || 'DEFAULT'] ?? h.bracket.number(b)
  const props: CSSObject = {}
  if (a in borderDirectionMap && v != null) {
    borderDirectionMap[a].forEach((i) => {
      props[`border${i}Width` as BorderProps] = v
    })
  }
  return props
}

function handlerBorderColor([, a = '', b]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  // const v = theme.borderWidth?.[b || 'DEFAULT'] ?? h.bracket.number(b)
  const props: CSSObject = {}
  if (a in borderDirectionMap) {
    borderDirectionMap[a].forEach((i) => {
      const data = parseColor(b, theme)
      if (!data)
        return
      const color = transformColor(data.alpha, data.color)
      if (color)
        props[`border${i}Color`] = color
    })
  }
  return props
}

function handleInsetValue(s: string, v: string, { theme }: RuleContext<Theme>): string | number | undefined {
  return theme.spacing?.[v] ?? h.bracket.auto.fraction.number(v)
}

type SizeProps = 'height' | 'width' | 'minHeight' | 'maxHeight' | 'minWidth' | 'maxWidth'

function getPropName(minmax: string, hw: string) {
  return `${minmax || ''}${sizeMapping[hw]}`.replace(/-(\w)/g, (_, p) => p.toUpperCase()) as SizeProps
}

function getSizeValue(minmax: string, hw: string, theme: Theme, prop: string) {
  const str = getPropName(minmax, hw)
  const v = theme[str]?.[prop]

  if (v != null)
    return v

  return h.bracket.auto.fraction.number(prop)
}

const directions: Record<string, string> = {
  '': '',
  'x': 'column-',
  'y': 'row-',
  'col': 'column-',
  'row': 'row-',
}

function handleGap([, d = '', s]: string[], { theme }: RuleContext<Theme>) {
  const v = theme.spacing?.[s] ?? h.bracket.number(s)
  if (v != null) {
    return {
      [`${directions[d]}gap`.replace(/-(\w)/g, (_, p) => p.toUpperCase())]: v,
    }
  }
}

function directionSize(propertyPrefix: 'margin' | 'padding'): DynamicMatcher {
  return ([_, direction, size]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined => {
    const v = theme.spacing?.[size || 'DEFAULT'] ?? h.bracket.auto.fraction.number(size)
    if (v != null)
      return { [`${propertyPrefix}${directionMap[direction]}`]: v }
  }
}

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

  // justifyContent
  ['justify-start', { justifyContent: 'flex-start' }],
  ['justify-end', { justifyContent: 'flex-end' }],
  ['justify-center', { justifyContent: 'center' }],
  ['justify-between', { justifyContent: 'space-between' }],
  ['justify-around', { justifyContent: 'space-around' }],
  ['justify-evenly', { justifyContent: 'space-evenly' }],

  // aspectRatio
  [/^aspect-(.+)$/, ([, d]: string[]) => ({ aspectRatio: getAspectRatio(d) })],

  // borderBottomWidth borderEndWidth borderLeftWidth borderRightWidth borderStartWidth borderTopWidth borderWidth
  [/^(?:border)()(?:-(.+))?$/, handlerBorderWidth],
  [/^(?:border)-([xylrtbse])(?:-(.+))?$/, handlerBorderWidth],

  [/^(?:border)()(?:-(.+))?$/, handlerBorderColor],
  [/^(?:border)-([xylrtbse])(?:-(.+))?$/, handlerBorderColor],

  // top left right bottom start end
  [/^(-?)(top|left|right|bottom|start|end)-(.+)$/, ([, s, d, v], ctx) => ({ [d]: handleInsetValue(s, v, ctx) })],

  // display
  ['flex', { display: 'flex' }],
  ['hidden', { display: 'none' }],

  // Flex Direction
  ['flex-row', { flexDirection: 'row' }],
  ['flex-row-reverse', { flexDirection: 'row-reverse' }],
  ['flex-col', { flexDirection: 'column' }],
  ['flex-col-reverse', { flexDirection: 'column-reverse' }],

  // Flex Wrap
  ['flex-wrap', { flexWrap: 'wrap' }],
  ['flex-wrap-reverse', { flexWrap: 'wrap-reverse' }],
  ['flex-nowrap', { flexWrap: 'nowrap' }],

  // overflow
  ['overflow-visible', { overflow: 'visible' }],
  ['overflow-hidden', { overflow: 'hidden' }],
  ['overflow-scroll', { overflow: 'scroll' }],

  // position
  ['absolute', { position: 'absolute' }],
  ['relative', { position: 'relative' }],

  // width height maxHeight minHeight maxWidth minWidth size
  [/^size-(min-|max-)?(.+)$/, ([, m, s], { theme }) => ({ [getPropName(m, 'w')]: getSizeValue(m, 'w', theme, s), [getPropName(m, 'h')]: getSizeValue(m, 'h', theme, s) })],
  [/^(?:size-)?(min-|max-)?([wh])-?(.+)$/, ([, m, w, s], { theme }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme, s) })],

  // gap columnGap rowGap
  [/^gap-?()(.+)$/, handleGap],
  [/^gap-([xy])-?(.+)$/, handleGap],
  [/^gap-(col|row)-?(.+)$/, handleGap],

  // flexBasis flexGrow flexShrink
  [/^shrink(?:-(.*))?$/, ([, d = '']) => ({ flexShrink: h.bracket.number(d) ?? 1 })],
  [/^grow(?:-(.*))?$/, ([, d = '']) => ({ flexGrow: h.bracket.percent.number(d) ?? 1 })],
  [/^basis-(.+)$/, ([, d], { theme }) => ({ flexBasis: theme.spacing?.[d] ?? h.bracket.auto.fraction.number(d) })],

  // padding
  [/^pa?()-?(-?.+)$/, directionSize('padding')],
  [/^p-?xy()()$/, directionSize('padding')],
  [/^p-?([xy])(?:-?(-?.+))?$/, directionSize('padding')],
  [/^p-?([rltbse])(?:-?(-?.+))?$/, directionSize('padding')],

  // marigns
  [/^ma?()-?(-?.+)$/, directionSize('margin')],
  [/^m-?xy()()$/, directionSize('margin')],
  [/^m-?([xy])(?:-?(-?.+))?$/, directionSize('margin')],
  [/^m-?([rltbse])(?:-?(-?.+))?$/, directionSize('margin')],

  // zIndex
  [/^z([\d.]+)$/, ([, v], { theme }) => ({ zIndex: theme.zIndex?.[v] ?? h.number(v) })],
  [/^z-(.+)$/, ([, v], { theme }: RuleContext<Theme>) => ({ zIndex: theme.zIndex?.[v] ?? h.bracket.auto.number(v) })],
]
