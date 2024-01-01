// export function isRawUtil(util: ParsedUtil |  RawUtil | StringifiedUtil): util is RawUtil{
//     return util.length === 3
// }
import type { Variant, VariantObject } from '../types'

// export function notNull<T>(value: T | null | undefined): value is T {
//   return value != null
// }

export function normalizeVariant(variant: Variant<any>): VariantObject<any> {
  return typeof variant === 'function'
    ? { match: variant }
    : variant
}
