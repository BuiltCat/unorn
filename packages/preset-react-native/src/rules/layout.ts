import type { CSSObject, DynamicMatcher, Rule, RuleContext } from '@unorn/core'
import type { Theme } from '../theme'
import { h } from '../utils/handlers'
import { borderDirectionMap, directionMap, sizeMapping } from '../utils/mappings'
import { hasParseableColor, parseColor, transformColor } from '../utils/utilities'

type BorderProps = 'borderLeftWidth' | 'borderRightWidth'

function handleAspectRatio([, a = '']: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  if (/^\d+\/\d+$/.test(a)) {
    return {
      aspectRatio: a,
    }
  }
  return {
    aspectRatio: theme.aspectRatio?.[a] ?? h.bracket.number(a),
  }
}

function handlerBorderWidth([, a = '', b]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  const v = theme.borderWidth?.[b || 'DEFAULT'] ?? h.bracket.number(b ?? '1')
  const props: CSSObject = {}
  if (a in borderDirectionMap && v != null) {
    borderDirectionMap[a].forEach((i) => {
      props[`border${i}Width` as BorderProps] = v
    })
  }
  return props
}

function handlerBorderColor([, a = '', b]: string[], ctx: RuleContext<Theme>): CSSObject | undefined {
  if (a in borderDirectionMap) {
    if (!hasParseableColor(b, ctx.theme, 'borderColor'))
      return handlerBorderWidth(['', a, b], ctx)
    const props: CSSObject = {}
    borderDirectionMap[a].forEach((i) => {
      const data = parseColor(b, ctx.theme)
      if (!data)
        return
      const color = transformColor(data.alpha, data.color)
      if (color)
        props[`border${i}Color`] = color
    })
    return props
  }
}

function handleInsetValue(s: string, v: string, { theme }: RuleContext<Theme>): string | number | undefined {
  return theme.spacing?.[v] ?? h.bracket.auto.fraction.number(v)
}

function handleZIndex([, v = '']: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  const n = theme.zIndex?.[v] ?? h.bracket.number(v)
  if (typeof n === 'number') {
    return {
      zIndex: n,
    }
  }
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

function directionSize(propertyPrefix: 'margin' | 'padding'): DynamicMatcher {
  return ([_, direction, size]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined => {
    const v = theme.spacing?.[size || 'DEFAULT'] ?? h.bracket.auto.fraction.number(size)
    if (v != null)
      return { [`${propertyPrefix}${directionMap[direction]}`]: v }
  }
}

export const layout: Rule<Theme>[] = [

  // aspectRatio
  [/^aspect-(.+)$/, handleAspectRatio],

  // borderBottomWidth borderEndWidth borderLeftWidth borderRightWidth borderStartWidth borderTopWidth borderWidth
  [/^(?:border)()(?:-(.+))?$/, handlerBorderWidth],
  [/^(?:border)-([xylrtbse])(?:-(.+))?$/, handlerBorderWidth],

  // borderColor
  [/^(?:border)()(?:-(.+))?$/, handlerBorderColor],
  [/^(?:border)-([xylrtbse])(?:-(.+))?$/, handlerBorderColor],

  // top left right bottom start end
  [/^(-?)(top|left|right|bottom|start|end)-(.+)$/, ([, s, d, v], ctx) => ({ [d]: handleInsetValue(s, v, ctx) })],

  // display
  ['flex', { display: 'flex' }],
  ['hidden', { display: 'none' }],

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
  [/^z-(.+)$/, handleZIndex],
]
