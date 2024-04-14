import type { Preset, PresetOptions } from '@unorn/core'
import type { Theme } from './theme'
import { theme } from './theme'
import { rules } from './rules'

export * from './rules'
export * from './theme'
export function presetReactNative(options: PresetOptions = {}): Preset<Theme> {
  return {
    name: '@unorn/preset-react-native',
    options,
    theme,
    rules,
  }
}
