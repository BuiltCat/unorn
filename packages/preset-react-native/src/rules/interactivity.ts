import type { Rule } from '@unorn/core'
import type { Theme } from '../theme'

export const interactivity: Rule<Theme>[] = [

  // pointerEvents
  ['pointer-events-none', { pointerEvents: 'none' }],
  ['pointer-events-auto', { pointerEvents: 'auto' }],
  ['pointer-events-box-none', { pointerEvents: 'box-none' }],
  ['pointer-events-box-only', { pointerEvents: 'box-only' }],

  // userSelect
  ['select-none', { userSelect: 'none' }],
  ['select-text', { userSelect: 'text' }],
  ['select-all', { userSelect: 'all' }],
  ['select-auto', { userSelect: 'auto' }],
  ['select-contain', { userSelect: 'contain' }],
]
