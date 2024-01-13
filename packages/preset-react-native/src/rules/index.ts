import type { Rule } from '@unocss-native/core'
import type { Theme } from '../theme'
import { text } from './text'
import { layout } from './layout'
import { border } from './border'
import { image } from './image'
import { backfaceVisibility, opacity, pointerEvents } from './view'

export const rules: Rule<Theme>[] = [
  text,
  layout,
  border,
  image,
  backfaceVisibility,
  opacity,
  pointerEvents,
].flat(1)
