import { describe, expect, it } from 'vitest'
import { createGenerator } from '@unocss-native/core'
import type { Theme } from '@unocss-native/preset-react-native'
import { rules } from '@unocss-native/preset-react-native'
import { variants } from '../packages/preset-react-native/src/variants/default'

describe('preset-react-native', () => {
  it('flex', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('flex')

    expect(css).toEqual([[{
      display: 'flex',
    }]])
  })

  it('flex-row', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('flex-row')

    expect(css).toEqual([[{
      flexDirection: 'row',
    }]])
  })

  it('aspectRatio', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('aspect-auto')
    const { css: css1 } = await uno.generate('aspect-square')
    const { css: css2 } = await uno.generate('aspect-video')
    const { css: css3 } = await uno.generate('aspect-1/2')
    const { css: css4 } = await uno.generate('aspect-[1/2]')

    expect(css).toEqual([[{
      aspectRatio: 'auto',
    }]])
    expect(css1).toEqual([[{
      aspectRatio: '1/1',
    }]])
    expect(css2).toEqual([[{
      aspectRatio: '16/9',
    }]])
    expect(css3).toEqual([[{
      aspectRatio: '1/2',
    }]])
    expect(css4).toEqual([[{
      aspectRatio: '1/2',
    }]])
  })

  it('top/Right/Bottom/Left', async () => {
    const uno = createGenerator<Theme>({
      rules,
      variants: variants(),
    })
    const { css } = await uno.generate('bottom-1/2 bottom-2/4 bottom-full bottom-auto bottom-100 -bottom-100 -bottom-full')

    expect(css).toEqual([[
      {
        bottom: '50%',
      },
      {
        bottom: '50%',
      },
      {
        bottom: '100%',
      },
      {
        bottom: 'auto',
      },
      {
        bottom: 100,
      },
      {
        bottom: -100,
      },
      {
        bottom: '-100%',
      },
    ]])
  })

  it('border', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('border-0 border-1 border-x-100 border-s-100 border-e-100')

    expect(css).toEqual([[
      {
        borderWidth: 0,
      },
      {
        borderWidth: 1,
      },
      {
        borderLeftWidth: 100,
        borderRightWidth: 100,
      },
      {
        borderStartWidth: 100,
      },
      {
        borderEndWidth: 100,
      },
    ]])
  })

  it('zIndex', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('z-100 z-auto')

    expect(css).toEqual([[
      {
        zIndex: 100,
      },
      {
        zIndex: 'auto',
      },
    ]])
  })
})

// describe('preset-react-native', () => {
//     test('basic', async () => {
//         const uno = createGenerator({
//             presets: [
//                 presetReactNative()
//             ]
//         })

//         const { css: css1 } = await uno.generate('backface-none bg-red-100', { minify: false, preflights: false })

//         expect(css1).toContain('.backface-none{backfaceVisibility:none;}')

//         const { css: css2 } = await uno.generate('backface-visible', { minify: false, preflights: false })

//         expect(css2).toContain('.backface-visible{backfaceVisibility:visible;}')

//         const { css: css3 } = await uno.generate('bg-red-100')

//         expect(css3).toContain('.bg-red-100{backgroundColor:rgba(254,226,226,1);}')

//         const { css: css4 } = await uno.generate('op10 op-30 opacity-100 pointer-events-none c-red color-red-50 text-red-300 font-mono')

//         expect(css4)
//     })

// })
