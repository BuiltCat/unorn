import type { Extractor } from '../types'

export const defaultSplitRE = /[\\:]?[\s'"`;{}]+/g

export function splitCode(code: string): string[] {
  return code.split(defaultSplitRE)
}

export const extractorSplit: Extractor = {
  name: '@unocss-native/core/extractor-split',
  order: 0,
  extract({ code }) {
    return splitCode(code)
  },
}

export { extractorSplit as extractorDefault }
