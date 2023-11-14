import { colorResolver } from '../utils/utilities'
import { Theme } from '../theme'
import { color } from './text'
import { POINTER_EVENTS_ENUM } from './constant'
import { Rule } from '@unocss-native/core'
import { layout } from './layout'


/**
 * @example backface-hidden backface-visible backfacehidden backfacevisible
 */
export const backfaceVisibility: Rule<Theme>[] = [
    [/^backface-?([-\w]+)$/, ([, v]) => ({ backfaceVisibility: v })]
]

/**
 * @example bg-red bg-red-5 bg-red-100/2
 */
export const backgroundColor: Rule<Theme>[] = [
    [/^bg-(.+)$/, colorResolver('backgroundColor'), { autocomplete: 'bg-$colors' }]
]

/**
 * @example op10 op-30 opacity-100
 */
export const opacity: Rule<Theme>[] = [
    [/^op(?:acity)?-?(.+)$/, ([, d]) => ({ opacity: Number(d) / 100 })]
]


/**
 * @example pointer-events-auto pointer-events-none pointer-events-box-none pointer-events-box-only
 */
export const pointerEvents: Rule<Theme>[] = POINTER_EVENTS_ENUM.map((keyword) => [`pointer-events-${keyword}`, { pointerEvents: keyword }])

// export const borderBottomColor: Rule[] = [
//      // compound
//   [/^(?:border|b)()(?:-(.+))?$/, handlerBorder, { autocomplete: '(border|b)-<directions>' }],
//   [/^(?:border|b)-([xy])(?:-(.+))?$/, handlerBorder],
//   [/^(?:border|b)-([rltbse])(?:-(.+))?$/, handlerBorder],
//   [/^(?:border|b)-(block|inline)(?:-(.+))?$/, handlerBorder],
//   [/^(?:border|b)-([bi][se])(?:-(.+))?$/, handlerBorder],

//   // size
//   [/^(?:border|b)-()(?:width|size)-(.+)$/, handlerBorderSize, { autocomplete: ['(border|b)-<num>', '(border|b)-<directions>-<num>'] }],
//   [/^(?:border|b)-([xy])-(?:width|size)-(.+)$/, handlerBorderSize],
//   [/^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/, handlerBorderSize],
//   [/^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/, handlerBorderSize],
//   [/^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/, handlerBorderSize],

//   // colors
//   [/^(?:border|b)-()(?:color-)?(.+)$/, handlerBorderColor, { autocomplete: ['(border|b)-$colors', '(border|b)-<directions>-$colors'] }],
//   [/^(?:border|b)-([xy])-(?:color-)?(.+)$/, handlerBorderColor],
//   [/^(?:border|b)-([rltbse])-(?:color-)?(.+)$/, handlerBorderColor],
//   [/^(?:border|b)-(block|inline)-(?:color-)?(.+)$/, handlerBorderColor],
//   [/^(?:border|b)-([bi][se])-(?:color-)?(.+)$/, handlerBorderColor],

//   // radius
//   [/^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/, handlerRounded, { autocomplete: ['(border|b)-(rounded|rd)', '(border|b)-(rounded|rd)-<num>', '(rounded|rd)', '(rounded|rd)-<num>'] }],
//   [/^(?:border-|b-)?(?:rounded|rd)-([rltbse])(?:-(.+))?$/, handlerRounded],
//   [/^(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/, handlerRounded],
//   [/^(?:border-|b-)?(?:rounded|rd)-([bise][se])(?:-(.+))?$/, handlerRounded],
//   [/^(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/, handlerRounded],

//   // style
//   [/^(?:border|b)-(?:style-)?()(.+)$/, handlerBorderStyle, { autocomplete: ['(border|b)-style', `(border|b)-(${borderStyles.join('|')})`, '(border|b)-<directions>-style', `(border|b)-<directions>-(${borderStyles.join('|')})`, `(border|b)-<directions>-style-(${borderStyles.join('|')})`, `(border|b)-style-(${borderStyles.join('|')})`] }],
//   [/^(?:border|b)-([xy])-(?:style-)?(.+)$/, handlerBorderStyle],
//   [/^(?:border|b)-([rltbse])-(?:style-)?(.+)$/, handlerBorderStyle],
//   [/^(?:border|b)-(block|inline)-(?:style-)?(.+)$/, handlerBorderStyle],
//   [/^(?:border|b)-([bi][se])-(?:style-)?(.+)$/, handlerBorderStyle],
// ]



export const rules: Rule<Theme>[] = [
    backfaceVisibility,
    backgroundColor,
    opacity,
    pointerEvents,
    color,
    layout
].flat(1)