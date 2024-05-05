import type { CSSObject, Rule, RuleContext } from '@unorn/core'
import type { Theme } from '../theme'
import { h } from '../utils/handlers'
import { colorResolver, getThemeBykey } from '../utils/utilities'

export const numberWithUnitRE = /^(-?\d*(?:\.\d+)?)(px|pt|pc|%|r?(?:em|ex|lh|cap|ch|ic)|(?:[sld]?v|cq)(?:[whib]|min|max)|in|cm|mm|rpx)?$/i
export const numberRE = /^(-?\d*(?:\.\d+)?)$/i
export const unitOnlyRE = /^(px)$/i

/**
 * @example c-red color-red5 text-red-300
 */
// export const color: Rule<Theme>[] = [
//   [/^(?:color|c)-(.+)$/, colorResolver('color'), { autocomplete: '(color|c)-$colors' }],
//   // auto detection and fallback to font-size if the content looks like a size
//   [/^text-(.+)$/, colorResolver('color', css => !css.color?.toString().match(numberWithUnitRE)), { autocomplete: 'text-$colors' }],
// ]

function handleSize([, s]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  const size = theme.fontSize?.[s] ?? h.bracket.number(s)
  if (typeof size === 'number')
    return { fontSize: size }
}

function handleThemeByKey(s: string, theme: Theme, key: 'lineHeight' | 'letterSpacing') {
  return theme[key]?.[s] ?? h.bracket.number(s)
}

export const text: Rule<Theme>[] = [

  // fontSize
  [/^text-(.+)$/, handleSize],

  // fontSize
  [/^text-(.+)$/, colorResolver('color', 'textColor')],

  // fontStyle
  ['italic', { fontStyle: 'italic' }],
  ['not-italic', { fontStyle: 'normal' }],

  // fontWeight
  [
    /^(?:font)-?([^-]+)$/,
    ([, d], { theme }) => getThemeBykey(theme, 'fontWeight', d),
  ],

  // lineHeight
  [
    /^(?:leading)-(.+)$/,
    ([, s], { theme }) => ({ lineHeight: handleThemeByKey(s, theme, 'lineHeight') }),
  ],

  // letterSpacing
  [
    /^tracking-(.+)$/,
    ([, s], { theme }) => ({ letterSpacing: handleThemeByKey(s, theme, 'letterSpacing') }),
  ],

  // textAlign
  ['text-center', { textAlign: 'center' }],
  ['text-left', { textAlign: 'left' }],
  ['text-right', { textAlign: 'right' }],
  ['text-justify', { textAlign: 'justify' }],
  ['text-auto', { textAlign: 'auto' }],

  // textTransform
  ['uppercase', { textTransform: 'uppercase' }],
  ['lowercase', { textTransform: 'lowercase' }],
  ['capitalize', { textTransform: 'capitalize' }],
  ['normal-case', { textTransform: 'none' }],

  // textDecorationLine
  ['underline', { textDecorationLine: 'underline' }],
  ['line-through', { textDecorationLine: 'line-through' }],
  ['underline-through', { textDecorationLine: 'underline line-through' }],
  ['no-underline', { textDecorationLine: 'none' }],

  // fontFamily
  [
    /^font-(.+)$/,
    ([, d], { theme }) => getThemeBykey(theme, 'fontFamily', d),
  ],
]
