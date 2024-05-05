import { describe, expect, it } from 'vitest'
import { createGenerator } from '@unorn/core'
import type { Theme } from '@unorn/preset-react-native'
import { presetReactNative } from '@unorn/preset-react-native'

describe('typography', () => {
  const uno = createGenerator<Theme>({
    presets: [presetReactNative()],
    theme: {
      fontSize: {
        xl: 1,
      },
      lineHeight: {
        'extra-loose': 2.5,
      },
    },
  })

  it('font family', async () => {
    expect((await uno.generate('font-sans')).styles).toEqual({ fontFamily: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"' })
    expect((await uno.generate('font-serif')).styles).toEqual({ fontFamily: 'ui-serif,Georgia,Cambria,"Times New Roman",Times,serif' })
    expect((await uno.generate('font-mono')).styles).toEqual({ fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace' })
  })

  it('font size', async () => {
    expect((await uno.generate('text-1')).styles).toEqual({ fontSize: 1 })
    expect((await uno.generate('text-2')).styles).toEqual({ fontSize: 2 })
    expect((await uno.generate('text-5')).styles).toEqual({ fontSize: 5 })
    expect((await uno.generate('text-10')).styles).toEqual({ fontSize: 10 })
    expect((await uno.generate('text-xl')).styles).toEqual({ fontSize: 1 })
  })

  it('font style', async () => {
    expect((await uno.generate('italic')).styles).toEqual({ fontStyle: 'italic' })
    expect((await uno.generate('not-italic')).styles).toEqual({ fontStyle: 'normal' })
  })

  it('font weight', async () => {
    expect((await uno.generate('font-thin')).styles).toEqual({ fontWeight: '100' })
    expect((await uno.generate('font-extralight')).styles).toEqual({ fontWeight: '200' })
    expect((await uno.generate('font-light')).styles).toEqual({ fontWeight: '300' })
    expect((await uno.generate('font-normal')).styles).toEqual({ fontWeight: 'normal' })
    expect((await uno.generate('font-medium')).styles).toEqual({ fontWeight: '500' })
    expect((await uno.generate('font-semibold')).styles).toEqual({ fontWeight: '600' })
    expect((await uno.generate('font-bold')).styles).toEqual({ fontWeight: 'bold' })
    expect((await uno.generate('font-extrabold')).styles).toEqual({ fontWeight: '800' })
    expect((await uno.generate('font-black')).styles).toEqual({ fontWeight: '900' })
    expect((await uno.generate('font-400')).styles).toEqual({ fontWeight: '400' })
    expect((await uno.generate('font-600')).styles).toEqual({ fontWeight: '600' })
  })

  it('letter spacing', async () => {
    expect((await uno.generate('tracking-normal')).styles).toEqual({ letterSpacing: 0 })
    expect((await uno.generate('tracking-tighter')).styles).toEqual({ letterSpacing: -2 })
    expect((await uno.generate('tracking-tight')).styles).toEqual({ letterSpacing: -1 })
    expect((await uno.generate('tracking-wide')).styles).toEqual({ letterSpacing: 1 })
    expect((await uno.generate('tracking-wider')).styles).toEqual({ letterSpacing: 2 })
    expect((await uno.generate('tracking-widest')).styles).toEqual({ letterSpacing: 3 })
    expect((await uno.generate('tracking-20')).styles).toEqual({ letterSpacing: 20 })
    expect((await uno.generate('-tracking-20')).styles).toEqual({ letterSpacing: -20 })
  })

  it('line height', async () => {
    expect((await uno.generate('leading-3')).styles).toEqual({ lineHeight: 3 })
    expect((await uno.generate('leading-4')).styles).toEqual({ lineHeight: 4 })
    expect((await uno.generate('leading-5')).styles).toEqual({ lineHeight: 5 })
    expect((await uno.generate('leading-6')).styles).toEqual({ lineHeight: 6 })
    expect((await uno.generate('leading-7')).styles).toEqual({ lineHeight: 7 })
    expect((await uno.generate('leading-8')).styles).toEqual({ lineHeight: 8 })
    expect((await uno.generate('leading-9')).styles).toEqual({ lineHeight: 9 })
    expect((await uno.generate('leading-10')).styles).toEqual({ lineHeight: 10 })
    expect((await uno.generate('leading-none')).styles).toEqual({ lineHeight: 1 })
    expect((await uno.generate('leading-tight')).styles).toEqual({ lineHeight: 1.25 })
    expect((await uno.generate('leading-snug')).styles).toEqual({ lineHeight: 1.375 })
    expect((await uno.generate('leading-normal')).styles).toEqual({ lineHeight: 1.5 })
    expect((await uno.generate('leading-relaxed')).styles).toEqual({ lineHeight: 1.625 })
    expect((await uno.generate('leading-loose')).styles).toEqual({ lineHeight: 2 })
    expect((await uno.generate('leading-extra-loose')).styles).toEqual({ lineHeight: 2.5 })
  })

  it('text align', async () => {
    expect((await uno.generate('text-center')).styles).toEqual({ textAlign: 'center' })
    expect((await uno.generate('text-left')).styles).toEqual({ textAlign: 'left' })
    expect((await uno.generate('text-right')).styles).toEqual({ textAlign: 'right' })
    expect((await uno.generate('text-justify')).styles).toEqual({ textAlign: 'justify' })
    expect((await uno.generate('text-auto')).styles).toEqual({ textAlign: 'auto' })
  })

  it('text decoration line', async () => {
    expect((await uno.generate('underline')).styles).toEqual({ textDecorationLine: 'underline' })
    expect((await uno.generate('line-through')).styles).toEqual({ textDecorationLine: 'line-through' })
    expect((await uno.generate('underline-through')).styles).toEqual({ textDecorationLine: 'underline line-through' })
    expect((await uno.generate('no-underline')).styles).toEqual({ textDecorationLine: 'none' })
  })

  it('text transform', async () => {
    expect((await uno.generate('uppercase')).styles).toEqual({ textTransform: 'uppercase' })
    expect((await uno.generate('lowercase')).styles).toEqual({ textTransform: 'lowercase' })
    expect((await uno.generate('capitalize')).styles).toEqual({ textTransform: 'capitalize' })
    expect((await uno.generate('normal-case')).styles).toEqual({ textTransform: 'none' })
  })
})
