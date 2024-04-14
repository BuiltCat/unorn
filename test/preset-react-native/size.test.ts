import { describe, expect, it } from 'vitest'
import { createGenerator } from '@unorn/core'
import type { Theme } from '@unorn/preset-react-native'
import { presetReactNative } from '@unorn/preset-react-native'

describe('flex props', () => {
  const uno = createGenerator<Theme>({
    presets: [presetReactNative()],
    theme: {
      spacing: {
        base: 1,
      },
      width: {
        xl: 5,
      },
      minWidth: {
        xl: 5,
      },
      maxWidth: {
        xl: 5,
      },
      height: {
        xl: 5,
      },
      maxHeight: {
        xl: 5,
      },
      minHeight: {
        xl: 5,
      },
    },
  })

  it('width', async () => {
    expect((await uno.generate('w-0')).styles).toEqual({ width: 0 })
    expect((await uno.generate('w-0.5')).styles).toEqual({ width: 0.5 })
    expect((await uno.generate('w-1/2')).styles).toEqual({ width: '50%' })
    expect((await uno.generate('w-base')).styles).toEqual({ width: 1 })
    expect((await uno.generate('w-xl')).styles).toEqual({ width: 5 })
  })

  it('min width', async () => {
    expect((await uno.generate('min-w-0')).styles).toEqual({ minWidth: 0 })
    expect((await uno.generate('min-w-0.5')).styles).toEqual({ minWidth: 0.5 })
    expect((await uno.generate('min-w-1/2')).styles).toEqual({ minWidth: '50%' })
    expect((await uno.generate('min-w-base')).styles).toEqual({ minWidth: 1 })
    expect((await uno.generate('min-w-xl')).styles).toEqual({ minWidth: 5 })
  })

  it('max width', async () => {
    expect((await uno.generate('max-w-0')).styles).toEqual({ maxWidth: 0 })
    expect((await uno.generate('max-w-0.5')).styles).toEqual({ maxWidth: 0.5 })
    expect((await uno.generate('max-w-1/2')).styles).toEqual({ maxWidth: '50%' })
    expect((await uno.generate('max-w-base')).styles).toEqual({ maxWidth: 1 })
    expect((await uno.generate('max-w-xl')).styles).toEqual({ maxWidth: 5 })
  })

  it('height', async () => {
    expect((await uno.generate('h-0')).styles).toEqual({ height: 0 })
    expect((await uno.generate('h-0.5')).styles).toEqual({ height: 0.5 })
    expect((await uno.generate('h-1/2')).styles).toEqual({ height: '50%' })
    expect((await uno.generate('h-base')).styles).toEqual({ height: 1 })
    expect((await uno.generate('h-xl')).styles).toEqual({ height: 5 })
  })

  it('max height', async () => {
    expect((await uno.generate('max-h-0')).styles).toEqual({ maxHeight: 0 })
    expect((await uno.generate('max-h-0.5')).styles).toEqual({ maxHeight: 0.5 })
    expect((await uno.generate('max-h-1/2')).styles).toEqual({ maxHeight: '50%' })
    expect((await uno.generate('max-h-base')).styles).toEqual({ maxHeight: 1 })
    expect((await uno.generate('max-h-xl')).styles).toEqual({ maxHeight: 5 })
  })

  it('min height', async () => {
    expect((await uno.generate('min-h-0')).styles).toEqual({ minHeight: 0 })
    expect((await uno.generate('min-h-0.5')).styles).toEqual({ minHeight: 0.5 })
    expect((await uno.generate('min-h-1/2')).styles).toEqual({ minHeight: '50%' })
    expect((await uno.generate('min-h-base')).styles).toEqual({ minHeight: 1 })
    expect((await uno.generate('min-h-xl')).styles).toEqual({ minHeight: 5 })
  })

  it('size', async () => {
    expect((await uno.generate('size-0')).styles).toEqual({ width: 0, height: 0 })
    expect((await uno.generate('size-0.5')).styles).toEqual({ width: 0.5, height: 0.5 })
    expect((await uno.generate('size-1/2')).styles).toEqual({ width: '50%', height: '50%' })
    expect((await uno.generate('size-base')).styles).toEqual({ width: 1, height: 1 })
    expect((await uno.generate('size-xl')).styles).toEqual({ width: 5, height: 5 })
  })
})
