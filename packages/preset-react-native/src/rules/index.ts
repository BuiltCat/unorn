import type { Rule } from '@unorn/core'
import type { Theme } from '../theme'
import { text } from './text'
import { layout } from './layout'
import { border } from './border'
import { image } from './image'
import { flex } from './flex'
import { spacing } from './spacing'
import { backfaceVisibility, backgroundColor, opacity, pointerEvents } from './view'
import { size } from './size'

export const rules: Rule<Theme>[] = [
  flex,
  text,
  layout,
  border,
  image,
  backfaceVisibility,
  opacity,
  pointerEvents,
  backgroundColor,
  spacing,
  size,
].flat(1)
