import { describe, expect, it } from 'vitest'
import { createGenerator } from '@unorn/core'
import type { Theme } from '@unorn/preset-react-native'
import { presetReactNative } from '@unorn/preset-react-native'

describe('effects', () => {
  const uno = createGenerator<Theme>({
    presets: [presetReactNative()],
    theme: {
      opacity: {
        easy: 0.66,
      },
    },
  })

  it('opacity', async () => {
    expect((await uno.generate('opacity-0')).styles).toEqual({ opacity: 0 })
    expect((await uno.generate('opacity-5')).styles).toEqual({ opacity: 0.05 })
    expect((await uno.generate('opacity-10')).styles).toEqual({ opacity: 0.10 })
    expect((await uno.generate('opacity-20')).styles).toEqual({ opacity: 0.20 })
    expect((await uno.generate('opacity-50')).styles).toEqual({ opacity: 0.50 })
    expect((await uno.generate('opacity-100')).styles).toEqual({ opacity: 1.00 })
    expect((await uno.generate('opacity-easy')).styles).toEqual({ opacity: 0.66 })
  })
})
