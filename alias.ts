import { resolve } from 'node:path'

function r(p: string) {
  return resolve(__dirname, p)
}

export const alias: Record<string, string> = {
  '@unorn/preset-react-native': r('./packages/preset-react-native/src/'),
  '@unorn/core': r('./packages/core/src/'),
  '@unorn/transformer': r('./packages/transformer/src/'),
}
