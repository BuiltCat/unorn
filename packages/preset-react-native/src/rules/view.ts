/**
 * View Style Props
 * @version 0.73
 */

import type { CSSObject, Rule } from '@unocss-native/core'
import type { Theme } from '../theme'
import { colorResolver } from '../utils/utilities'
import { h } from '../utils/handlers'

/**
 * @example backface-hidden backface-visible
 */
function isBackfaceVisibility(str: string): str is 'visible' | 'hidden' {
  return ['visible', 'hidden'].includes(str)
}

export function handlerBackfaceVisibility([, s]: string[]): CSSObject | undefined {
  if (isBackfaceVisibility(s)) {
    return {
      backfaceVisibility: s,
    }
  }
}

export const backfaceVisibility: Rule<Theme>[] = [
  [/^backface-([-\w]+)$/, handlerBackfaceVisibility],
]

/**
 * @example bg-red bg-red-50 bg-red-100/2
 */
export const backgroundColor: Rule<Theme>[] = [
  [/^bg-(.+)$/, colorResolver('backgroundColor', 'backgroundColor')],
]

/**
 * @example opacity-100
 */
export const opacity: Rule<Theme>[] = [
  [/^opacity-(.+)$/, ([, d]) => ({ opacity: h.bracket.percent(d) })],
]

export const pointerEvents: Rule<Theme>[] = [
  ['pointer-events-none', { pointerEvents: 'none' }],
  ['pointer-events-none', { pointerEvents: 'auto' }],
  ['pointer-events-box-none', { pointerEvents: 'box-none' }],
  ['pointer-events-box-only', { pointerEvents: 'box-only' }],
]
