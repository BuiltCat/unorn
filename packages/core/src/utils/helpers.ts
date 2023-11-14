// export function isRawUtil(util: ParsedUtil |  RawUtil | StringifiedUtil): util is RawUtil{
//     return util.length === 3
// }
export function notNull<T>(value: T | null | undefined): value is T {
  return value != null;
}
