import { describe, expect, it } from 'vitest'
import { createGenerator } from '@unorn/core'
import type { Theme } from '@unorn/preset-react-native'
import { presetReactNative } from '@unorn/preset-react-native'

describe('effects', () => {
  const uno = createGenerator<Theme>({
    presets: [presetReactNative()],
  })

  it('pointer events', async () => {
    expect((await uno.generate('pointer-events-none')).styles).toEqual({ pointerEvents: 'none' })
    expect((await uno.generate('pointer-events-auto')).styles).toEqual({ pointerEvents: 'auto' })
    expect((await uno.generate('pointer-events-box-none')).styles).toEqual({ pointerEvents: 'box-none' })
    expect((await uno.generate('pointer-events-box-only')).styles).toEqual({ pointerEvents: 'box-only' })
  })

  it('user select', async () => {
    expect((await uno.generate('select-none')).styles).toEqual({ userSelect: 'none' })
    expect((await uno.generate('select-text')).styles).toEqual({ userSelect: 'text' })
    expect((await uno.generate('select-all')).styles).toEqual({ userSelect: 'all' })
    expect((await uno.generate('select-auto')).styles).toEqual({ userSelect: 'auto' })
    expect((await uno.generate('select-contain')).styles).toEqual({ userSelect: 'contain' })
  })
})
