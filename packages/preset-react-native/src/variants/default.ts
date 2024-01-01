import type { Variant } from '@unocss-native/core'
import type { Theme } from '../theme'
import { variantNegative } from './negative'

export function variants(): Variant<Theme>[] {
  return [
    variantNegative,
  ]
}
