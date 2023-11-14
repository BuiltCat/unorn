// import { Rule } from '@unocss/core'
import { colorResolver } from '../utils/utilities'
import { Theme } from '../theme'
import { Rule } from '@unocss-native/core'
// import {  handler as h } from '@unocss/preset-mini/utils'

export const numberWithUnitRE = /^(-?\d*(?:\.\d+)?)(px|pt|pc|%|r?(?:em|ex|lh|cap|ch|ic)|(?:[sld]?v|cq)(?:[whib]|min|max)|in|cm|mm|rpx)?$/i
export const numberRE = /^(-?\d*(?:\.\d+)?)$/i
export const unitOnlyRE = /^(px)$/i

/**
 * @example c-red color-red5 text-red-300
 */
export const color: Rule<Theme>[] = [
    [/^(?:color|c)-(.+)$/, colorResolver('color',), { autocomplete: '(color|c)-$colors' }],
    // auto detection and fallback to font-size if the content looks like a size
    [/^text-(.+)$/, colorResolver('color', css => !css.color?.toString().match(numberWithUnitRE)), { autocomplete: 'text-$colors' }],
]

// export const fontFamily: Rule<Theme>[] = [
//     [
//         /^font-(.+)$/,
//         ([, d], { theme }) => ({ 'font-family': theme.fontFamily?.[d] || h.bracket.cssvar.global(d) }),
//         { autocomplete: 'font-$fontFamily' },
//     ]
// ]