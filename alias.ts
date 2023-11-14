import { resolve } from 'node:path'

function r(p: string) {
  return resolve(__dirname, p)
}

export const alias: Record<string, string> = {
  '@unocss/preset-react-native': r('./packages/preset-react-native/src/'),
  '@unocss-native/core': r('./packages/core/src/'),
  '@unocss-native/transformer': r('./packages/transformer/src/')
}
