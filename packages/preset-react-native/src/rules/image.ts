// import { Rule } from '@unocss/core'
import type { Rule } from '@unorn/core'
import type { Theme } from '../theme'

export const image: Rule<Theme>[] = [

  // objectFit
  ['object-cover', { objectFit: 'cover' }],
  ['object-contain', { objectFit: 'contain' }],
  ['object-scale-down', { objectFit: 'scale-down' }],
  ['object-fill', { objectFit: 'fill' }],
]
