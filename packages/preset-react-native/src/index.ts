import { Preset, PresetOptions } from '@unocss/core'
import { theme, Theme } from './theme'
import { rules } from './rules'
export * from './rules'
export * from './theme'
export function presetReactNative(options: PresetOptions = {}): Preset<Theme> {

    return {
        name: '@unocss-native/preset-react-native',
        options,
        theme,
        rules
    }
}
