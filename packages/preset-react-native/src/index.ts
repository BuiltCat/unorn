import type { Preset, PresetOptions } from '@unocss/core'
import type { Theme } from './theme'
import { theme } from './theme'
import { rules } from './rules'

export * from './rules'
export * from './theme'
export function presetReactNative(options: PresetOptions = {}): Preset<Theme> {
  return {
    name: '@unocss-native/preset-react-native',
    options,
    theme,
    rules,
  }
}
