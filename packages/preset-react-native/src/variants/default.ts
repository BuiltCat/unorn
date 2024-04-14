import type { Variant } from '@unorn/core'
import type { Theme } from '../theme'
import { variantNegative } from './negative'

export function variants(): Variant<Theme>[] {
  return [
    variantNegative,
  ]
}
