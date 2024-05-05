import type { Rule } from '@unorn/core'
import type { Theme } from '../theme'
import { text } from './typography'
import { layout } from './layout'
import { border } from './border'
import { image } from './image'
import { flex } from './flex'
import { spacing } from './spacing'
import { backfaceVisibility, backgroundColor } from './view'
import { size } from './size'
import { effects } from './effects'
import { interactivity } from './Interactivity'

export const rules: Rule<Theme>[] = [
  flex,
  text,
  layout,
  border,
  image,
  backfaceVisibility,
  backgroundColor,
  spacing,
  size,
  effects,
  interactivity,
].flat(1)
