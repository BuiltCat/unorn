import type { Rule } from '@unorn/core'
import type { Theme } from '../theme'
import { text } from './text'
import { layout } from './layout'
import { border } from './border'
import { image } from './image'
import { backfaceVisibility, backgroundColor, opacity, pointerEvents } from './view'

export const rules: Rule<Theme>[] = [
  text,
  layout,
  border,
  image,
  backfaceVisibility,
  opacity,
  pointerEvents,
  backgroundColor,
].flat(1)
