import { describe, expect, it } from 'vitest'
import { createGenerator } from '@unocss-native/core'
import type { Theme } from '@unocss-native/preset-react-native'
import { rules, theme } from '@unocss-native/preset-react-native'
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
      theme: {
        borderRadius: {
          none: 0,
        },
      },
    })
    const { css } = await uno.generate('border-0 border-1 border-x-100 border-s-100 border-e-100 rounded-none rounded')

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
      {
        borderRadius: 0,
      },
      {
        borderRadius: 1,
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

  it('backfaceVisibility', async () => {
    const uno = createGenerator<Theme>({
      rules,
    })
    const { css } = await uno.generate('backface-hidden backface-visible')

    expect(css).toEqual([[
      {
        backfaceVisibility: 'hidden',
      },
      {
        backfaceVisibility: 'visible',
      },
    ]])
  })

  it('font size', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme: {
        fontSize: {
          xl: 100,
        },
      },
    })
    const { css } = await uno.generate('text-100 text-xl')

    expect(css).toEqual([[
      {
        fontSize: 100,
      },
      {
        fontSize: 100,
      },
    ]])
  })

  it('font weight', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme: {
        fontWeight: {
          normal: 'normal',
          bold: 'bold',
          100: '100',
          200: '200',
          300: '300',
          400: '400',
          500: '500',
          600: '600',
          700: '700',
          800: '800',
          900: '900',
        },
      },
    })
    const { css } = await uno.generate('font-100 font-normal')

    expect(css).toEqual([[
      {
        fontWeight: '100',
      },
      {
        fontWeight: 'normal',
      },
    ]])
  })

  it('line height', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme: {
        lineHeight: {
          tight: 1.25,
        },
      },
    })
    const { css } = await uno.generate('leading-tight leading-2')

    expect(css).toEqual([[
      {
        lineHeight: 1.25,
      },
      {
        lineHeight: 2,
      },
    ]])
  })

  it('letter Spacing', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme: {
        letterSpacing: {
          tight: 1.25,
        },
      },
    })
    const { css } = await uno.generate('tracking-tight tracking-2')

    expect(css).toEqual([[
      {
        letterSpacing: 1.25,
      },
      {
        letterSpacing: 2,
      },
    ]])
  })

  it('text align', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme: {
        letterSpacing: {
          tight: 1.25,
        },
      },
    })
    const { css } = await uno.generate('text-center text-auto')

    expect(css).toEqual([[
      {
        textAlign: 'center',
      },
      {
        textAlign: 'auto',
      },
    ]])
  })

  it('text Transform', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme: {
        letterSpacing: {
          tight: 1.25,
        },
      },
    })
    const { css } = await uno.generate('uppercase lowercase')

    expect(css).toEqual([[
      {
        textTransform: 'uppercase',
      },
      {
        textTransform: 'lowercase',
      },
    ]])
  })

  it('text DecorationLine', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme: {
        letterSpacing: {
          tight: 1.25,
        },
      },
    })
    const { css } = await uno.generate('underline underline-through')

    expect(css).toEqual([[
      { textDecorationLine: 'underline' },
      {
        textDecorationLine: 'underline line-through',
      },
    ]])
  })

  it('opacity', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme: {
        letterSpacing: {
          tight: 1.25,
        },
      },
    })
    const { css } = await uno.generate('opacity-1 opacity-100')

    expect(css).toEqual([[
      { opacity: 0.01 },
      {
        opacity: 1,
      },
    ]])
  })

  it('userSelect', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme: {
        letterSpacing: {
          tight: 1.25,
        },
      },
    })
    const { css } = await uno.generate('select-none')

    expect(css).toEqual([[
      { userSelect: 'none' },
    ]])
  })

  it('object Fit', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme: {
        letterSpacing: {
          tight: 1.25,
        },
      },
    })
    const { css } = await uno.generate('object-contain')

    expect(css).toEqual([[
      { objectFit: 'contain' },
    ]])
  })

  it('pointer Events', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme: {
        letterSpacing: {
          tight: 1.25,
        },
      },
    })
    const { css } = await uno.generate('pointer-events-box-none')

    expect(css).toEqual([[
      { pointerEvents: 'box-none' },
    ]])
  })
  it('background', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme,
    })
    const { css } = await uno.generate('bg-sky-500/50 bg-sky-500/[.06]')

    expect(css).toEqual([[
      { background: 'box-none' },
    ]])
  })
  it('text color', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme,
    })
    const { css } = await uno.generate('text-sky-500/50 text-sky-500/[.06]')

    expect(css).toEqual([[
      { background: 'box-none' },
    ]])
  })

  it('border color', async () => {
    const uno = createGenerator<Theme>({
      rules,
      theme,
    })
    const { css } = await uno.generate('border-sky-500/50 border-x-sky-500/[.06]')

    expect(css).toEqual([[
      { background: 'box-none' },
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
