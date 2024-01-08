import { describe, expect, it } from 'vitest'
import { createGenerator } from '@unocss-native/core'
import type { Theme } from '@unocss-native/preset-react-native'
import { rules } from '@unocss-native/preset-react-native'
import { variants } from '../packages/preset-react-native/src/variants/default'

describe('preset-react-native', () => {
  it('display', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('flex hidden')

    expect(css).toEqual([[{
      display: 'flex',
    }, {
      display: 'none',
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

  it('top/right/bottom/left', async () => {
    const uno = createGenerator<Theme>({
      rules,
      variants: variants(),
    })
    const { css } = await uno.generate('bottom-1/2 left-1/2 bottom-2/4 bottom-full bottom-auto bottom-100 -bottom-100 -bottom-full')

    expect(css).toEqual([[
      {
        bottom: '50%',
      },
      {
        left: '50%',
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

  it('justifyContent', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('justify-start justify-end justify-center justify-between justify-around justify-evenly')

    expect(css).toEqual([[
      { justifyContent: 'flex-start' },
      { justifyContent: 'flex-end' },
      { justifyContent: 'center' },
      { justifyContent: 'space-between' },
      { justifyContent: 'space-around' },
      { justifyContent: 'space-evenly' },
    ]])
  })

  it('overflow', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('overflow-visible overflow-hidden overflow-scroll')

    expect(css).toEqual([[
      { overflow: 'visible' },
      { overflow: 'hidden' },
      { overflow: 'scroll' },
    ]])
  })

  it('position', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('absolute relative')

    expect(css).toEqual([[
      { position: 'absolute' },
      { position: 'relative' },
    ]])
  })

  it('size', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('w-1 w-2 w-10 w-10/12 size-1 size-2')

    expect(css).toEqual([[
      { position: 'absolute' },
      { position: 'relative' },
    ]])
  })

  it('gap', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('gap-1 gap-2 gap-10')

    expect(css).toEqual([[
      { position: 'absolute' },
      { position: 'relative' },
    ]])
  })

  it('shrink grow basis', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('grow grow-0 shrink shrink-0 basis-2 basis-auto basis-1/2')

    expect(css).toEqual([[
      { position: 'absolute' },
      { position: 'relative' },
    ]])
  })

  it('marign padding', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('m-1 ma-1 ml-1 m-l-1 ma m-auto m-a-auto')

    expect(css).toEqual([[
      { position: 'absolute' },
      { position: 'relative' },
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
