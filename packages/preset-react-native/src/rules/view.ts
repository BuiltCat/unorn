/**
 * View Style Props
 * @version 0.72
 */

import { Rule } from "@unocss-native/core";
import { Theme } from "../theme";
import { colorResolver } from "../utils/utilities";


/**
 * @example backface-hidden backface-visible
 */

export const backfaceVisibility: Rule<Theme>[] = [
    [/^backface-([-\w]+)$/, ([, v]) => ({ backfaceVisibility: v })]
]

/**
 * @example bg-red bg-red-50 bg-red-100/2
 */
export const backgroundColor: Rule<Theme>[] = [
    [/^bg-(.+)$/, colorResolver('backgroundColor'), { autocomplete: 'bg-$colors' }]
]
