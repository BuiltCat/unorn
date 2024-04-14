import { describe, expect, it } from 'vitest'
import { createGenerator } from '@unorn/core'
import type { Theme } from '@unorn/preset-react-native'
import { presetReactNative } from '@unorn/preset-react-native'

describe('layout props', () => {
  const uno = createGenerator<Theme>({
    presets: [presetReactNative()],
    theme: {
      spacing: {
        wide: 100,
      },
      zIndex: {
        baseLayer: 10,
      },
    },
  })

  // layout
  it('aspect ratio', async () => {
    expect((await uno.generate('aspect-auto')).styles).toEqual({ aspectRatio: 'auto' })
    expect((await uno.generate('aspect-square')).styles).toEqual({ aspectRatio: '1/1' })
    expect((await uno.generate('aspect-video')).styles).toEqual({ aspectRatio: '16/9' })
    expect((await uno.generate('aspect-4/2')).styles).toEqual({ aspectRatio: '4/2' })
    expect((await uno.generate('aspect-[4/2]')).styles).toEqual({ aspectRatio: '4/2' })
    expect((await uno.generate('aspect-1')).styles).toEqual({ aspectRatio: 1 })
    expect((await uno.generate('aspect-[1]')).styles).toEqual({ aspectRatio: 1 })
  })

  it('display', async () => {
    expect((await uno.generate('flex')).styles).toEqual({ display: 'flex' })
    expect((await uno.generate('hidden')).styles).toEqual({ display: 'none' })
  })

  it('object fit', async () => {
    expect((await uno.generate('object-cover')).styles).toEqual({ objectFit: 'cover' })
    expect((await uno.generate('object-contain')).styles).toEqual({ objectFit: 'contain' })
    expect((await uno.generate('object-scale-down')).styles).toEqual({ objectFit: 'scale-down' })
    expect((await uno.generate('object-fill')).styles).toEqual({ objectFit: 'fill' })
  })

  it('overflow', async () => {
    expect((await uno.generate('overflow-visible')).styles).toEqual({ overflow: 'visible' })
    expect((await uno.generate('overflow-hidden')).styles).toEqual({ overflow: 'hidden' })
    expect((await uno.generate('overflow-scroll')).styles).toEqual({ overflow: 'scroll' })
  })

  it('position', async () => {
    expect((await uno.generate('absolute')).styles).toEqual({ position: 'absolute' })
    expect((await uno.generate('relative')).styles).toEqual({ position: 'relative' })
  })

  it('top / right / bottom / left / start / end', async () => {
    expect((await uno.generate('start-0')).styles).toEqual({ start: 0 })
    expect((await uno.generate('end-0')).styles).toEqual({ end: 0 })
    expect((await uno.generate('top-0')).styles).toEqual({ top: 0 })
    expect((await uno.generate('left-0')).styles).toEqual({ left: 0 })
    expect((await uno.generate('right-0')).styles).toEqual({ right: 0 })
    expect((await uno.generate('bottom-0')).styles).toEqual({ bottom: 0 })

    expect((await uno.generate('start-1/2')).styles).toEqual({ start: '50%' })
    expect((await uno.generate('end-1/2')).styles).toEqual({ end: '50%' })
    expect((await uno.generate('top-1/2')).styles).toEqual({ top: '50%' })
    expect((await uno.generate('left-1/2')).styles).toEqual({ left: '50%' })
    expect((await uno.generate('right-1/2')).styles).toEqual({ right: '50%' })
    expect((await uno.generate('bottom-1/2')).styles).toEqual({ bottom: '50%' })

    expect((await uno.generate('start-full')).styles).toEqual({ start: '100%' })
    expect((await uno.generate('end-full')).styles).toEqual({ end: '100%' })
    expect((await uno.generate('top-full')).styles).toEqual({ top: '100%' })
    expect((await uno.generate('left-full')).styles).toEqual({ left: '100%' })
    expect((await uno.generate('right-full')).styles).toEqual({ right: '100%' })
    expect((await uno.generate('bottom-full')).styles).toEqual({ bottom: '100%' })

    expect((await uno.generate('start-[1]')).styles).toEqual({ start: 1 })
    expect((await uno.generate('end-[1]')).styles).toEqual({ end: 1 })
    expect((await uno.generate('top-[1]')).styles).toEqual({ top: 1 })
    expect((await uno.generate('left-[1]')).styles).toEqual({ left: 1 })
    expect((await uno.generate('right-[1]')).styles).toEqual({ right: 1 })
    expect((await uno.generate('bottom-[1]')).styles).toEqual({ bottom: 1 })

    expect((await uno.generate('start-wide')).styles).toEqual({ start: 100 })
    expect((await uno.generate('end-wide')).styles).toEqual({ end: 100 })
    expect((await uno.generate('top-wide')).styles).toEqual({ top: 100 })
    expect((await uno.generate('left-wide')).styles).toEqual({ left: 100 })
    expect((await uno.generate('right-wide')).styles).toEqual({ right: 100 })
    expect((await uno.generate('bottom-wide')).styles).toEqual({ bottom: 100 })
  })

  it('z-index', async () => {
    expect((await uno.generate('z-1')).styles).toEqual({ zIndex: 1 })
    expect((await uno.generate('z-100')).styles).toEqual({ zIndex: 100 })
    expect((await uno.generate('z-[100]')).styles).toEqual({ zIndex: 100 })
    expect((await uno.generate('z-baseLayer')).styles).toEqual({ zIndex: 10 })
  })

  // flex
  it('flex basis', async () => {
    expect((await uno.generate('basis-0')).styles).toEqual({ flexBasis: 0 })
    expect((await uno.generate('basis-1')).styles).toEqual({ flexBasis: 1 })
    expect((await uno.generate('basis-1/2')).styles).toEqual({ flexBasis: '50%' })
    expect((await uno.generate('basis-0/2')).styles).toEqual({ flexBasis: 0 })
    expect((await uno.generate('basis-full')).styles).toEqual({ flexBasis: '100%' })
  })

  it('flex direction', async () => {
    expect((await uno.generate('flex-row')).styles).toEqual({ flexDirection: 'row' })
    expect((await uno.generate('flex-row-reverse')).styles).toEqual({ flexDirection: 'row-reverse' })
    expect((await uno.generate('flex-col')).styles).toEqual({ flexDirection: 'column' })
    expect((await uno.generate('flex-col-reverse')).styles).toEqual({ flexDirection: 'column-reverse' })
  })

  it('flex wrap', async () => {
    expect((await uno.generate('flex-wrap')).styles).toEqual({ flexWrap: 'wrap' })
    expect((await uno.generate('flex-wrap-reverse')).styles).toEqual({ flexWrap: 'wrap-reverse' })
    expect((await uno.generate('flex-nowrap')).styles).toEqual({ flexWrap: 'nowrap' })
  })

  it('flex grow', async () => {
    expect((await uno.generate('grow')).styles).toEqual({ flexGrow: 1 })
    expect((await uno.generate('grow-0')).styles).toEqual({ flexGrow: 0 })
    expect((await uno.generate('grow-3')).styles).toEqual({ flexGrow: 3 })
  })

  it('flex shrink', async () => {
    expect((await uno.generate('shrink')).styles).toEqual({ flexShrink: 1 })
    expect((await uno.generate('shrink-0')).styles).toEqual({ flexShrink: 0 })
    expect((await uno.generate('shrink-3')).styles).toEqual({ flexShrink: 3 })
  })

  it('gap', async () => {
    expect((await uno.generate('gap-0')).styles).toEqual({ gap: 0 })
    expect((await uno.generate('gap-x-0')).styles).toEqual({ columnGap: 0 })
    expect((await uno.generate('gap-y-0')).styles).toEqual({ rowGap: 0 })
    expect((await uno.generate('gap-x-px')).styles).toEqual({ columnGap: 1 })
    expect((await uno.generate('gap-y-px')).styles).toEqual({ rowGap: 1 })
    expect((await uno.generate('gap-0.5')).styles).toEqual({ gap: 0.5 })
    expect((await uno.generate('gap-x-0.5')).styles).toEqual({ columnGap: 0.5 })
    expect((await uno.generate('gap-y-0.5')).styles).toEqual({ rowGap: 0.5 })
  })

  it('justify content', async () => {
    expect((await uno.generate('justify-start')).styles).toEqual({ justifyContent: 'flex-start' })
    expect((await uno.generate('justify-end')).styles).toEqual({ justifyContent: 'flex-end' })
    expect((await uno.generate('justify-center')).styles).toEqual({ justifyContent: 'center' })
    expect((await uno.generate('justify-between')).styles).toEqual({ justifyContent: 'space-between' })
    expect((await uno.generate('justify-around')).styles).toEqual({ justifyContent: 'space-around' })
    expect((await uno.generate('justify-evenly')).styles).toEqual({ justifyContent: 'space-evenly' })
  })

  it('align content', async () => {
    expect((await uno.generate('content-center')).styles).toEqual({ alignContent: 'center' })
    expect((await uno.generate('content-start')).styles).toEqual({ alignContent: 'flex-start' })
    expect((await uno.generate('content-end')).styles).toEqual({ alignContent: 'flex-end' })
    expect((await uno.generate('content-between')).styles).toEqual({ alignContent: 'space-between' })
    expect((await uno.generate('content-around')).styles).toEqual({ alignContent: 'space-around' })
    expect((await uno.generate('content-stretch')).styles).toEqual({ alignContent: 'stretch' })
  })

  it('align items', async () => {
    expect((await uno.generate('items-start')).styles).toEqual({ alignItems: 'flex-start' })
    expect((await uno.generate('items-end')).styles).toEqual({ alignItems: 'flex-end' })
    expect((await uno.generate('items-center')).styles).toEqual({ alignItems: 'center' })
    expect((await uno.generate('items-baseline')).styles).toEqual({ alignItems: 'baseline' })
    expect((await uno.generate('items-stretch')).styles).toEqual({ alignItems: 'stretch' })
  })

  it('align self', async () => {
    expect((await uno.generate('self-auto')).styles).toEqual({ alignSelf: 'auto' })
    expect((await uno.generate('self-start')).styles).toEqual({ alignSelf: 'flex-start' })
    expect((await uno.generate('self-end')).styles).toEqual({ alignSelf: 'flex-end' })
    expect((await uno.generate('self-center')).styles).toEqual({ alignSelf: 'center' })
    expect((await uno.generate('self-stretch')).styles).toEqual({ alignSelf: 'stretch' })
    expect((await uno.generate('self-baseline')).styles).toEqual({ alignSelf: 'baseline' })
  })

  // borders
  it('border width', async () => {
    expect((await uno.generate('border-0')).styles).toEqual({ borderWidth: 0 })
    expect((await uno.generate('border-2')).styles).toEqual({ borderWidth: 2 })
    expect((await uno.generate('border-4')).styles).toEqual({ borderWidth: 4 })
    expect((await uno.generate('border')).styles).toEqual({ borderWidth: 1 })
    expect((await uno.generate('border-x-0')).styles).toEqual({ borderLeftWidth: 0, borderRightWidth: 0 })
    expect((await uno.generate('border-x-2')).styles).toEqual({ borderLeftWidth: 2, borderRightWidth: 2 })
    expect((await uno.generate('border-x-4')).styles).toEqual({ borderLeftWidth: 4, borderRightWidth: 4 })
    expect((await uno.generate('border-x')).styles).toEqual({ borderLeftWidth: 1, borderRightWidth: 1 })
    expect((await uno.generate('border-y-0')).styles).toEqual({ borderTopWidth: 0, borderBottomWidth: 0 })
    expect((await uno.generate('border-y-2')).styles).toEqual({ borderTopWidth: 2, borderBottomWidth: 2 })
    expect((await uno.generate('border-y-4')).styles).toEqual({ borderTopWidth: 4, borderBottomWidth: 4 })
    expect((await uno.generate('border-y')).styles).toEqual({ borderTopWidth: 1, borderBottomWidth: 1 })
    expect((await uno.generate('border-s-0')).styles).toEqual({ borderStartWidth: 0 })
    expect((await uno.generate('border-s-2')).styles).toEqual({ borderStartWidth: 2 })
    expect((await uno.generate('border-s-4')).styles).toEqual({ borderStartWidth: 4 })
    expect((await uno.generate('border-s')).styles).toEqual({ borderStartWidth: 1 })
    expect((await uno.generate('border-e-0')).styles).toEqual({ borderEndWidth: 0 })
    expect((await uno.generate('border-e-2')).styles).toEqual({ borderEndWidth: 2 })
    expect((await uno.generate('border-e-4')).styles).toEqual({ borderEndWidth: 4 })
    expect((await uno.generate('border-e')).styles).toEqual({ borderEndWidth: 1 })
    expect((await uno.generate('border-t-0')).styles).toEqual({ borderTopWidth: 0 })
    expect((await uno.generate('border-t-2')).styles).toEqual({ borderTopWidth: 2 })
    expect((await uno.generate('border-t-4')).styles).toEqual({ borderTopWidth: 4 })
    expect((await uno.generate('border-t')).styles).toEqual({ borderTopWidth: 1 })
    expect((await uno.generate('border-r-0')).styles).toEqual({ borderRightWidth: 0 })
    expect((await uno.generate('border-r-2')).styles).toEqual({ borderRightWidth: 2 })
    expect((await uno.generate('border-r-4')).styles).toEqual({ borderRightWidth: 4 })
    expect((await uno.generate('border-r')).styles).toEqual({ borderRightWidth: 1 })
    expect((await uno.generate('border-b-0')).styles).toEqual({ borderBottomWidth: 0 })
    expect((await uno.generate('border-b-2')).styles).toEqual({ borderBottomWidth: 2 })
    expect((await uno.generate('border-b-4')).styles).toEqual({ borderBottomWidth: 4 })
    expect((await uno.generate('border-b')).styles).toEqual({ borderBottomWidth: 1 })
    expect((await uno.generate('border-l-0')).styles).toEqual({ borderLeftWidth: 0 })
    expect((await uno.generate('border-l-2')).styles).toEqual({ borderLeftWidth: 2 })
    expect((await uno.generate('border-l-4')).styles).toEqual({ borderLeftWidth: 4 })
    expect((await uno.generate('border-l')).styles).toEqual({ borderLeftWidth: 1 })
  })

  it('border color', async () => {
    expect((await uno.generate('border-transparent')).styles).toEqual({ borderColor: 'transparent' })
    expect((await uno.generate('border-black')).styles).toEqual({ borderColor: '#000' })
    expect((await uno.generate('border-slate-50')).styles).toEqual({ borderColor: '#f8fafc' })
  })

  it('border style', async () => {
    expect((await uno.generate('border-solid')).styles).toEqual({ borderStyle: 'solid' })
    expect((await uno.generate('border-dotted')).styles).toEqual({ borderStyle: 'dotted' })
    expect((await uno.generate('border-dashed')).styles).toEqual({ borderStyle: 'dashed' })
  })

  it('border radius', async () => {
    expect((await uno.generate('rounded-bl')).styles).toEqual({ borderBottomLeftRadius: 1 })
    expect((await uno.generate('rounded-e')).styles).toEqual({ borderEndEndRadius: 1, borderStartEndRadius: 1 })
    expect((await uno.generate('rounded-bs')).styles).toEqual({ borderStartEndRadius: 1, borderStartStartRadius: 1 })
    expect((await uno.generate('rounded-bl')).styles).toEqual({ borderBottomLeftRadius: 1 })
    expect((await uno.generate('rounded-bl')).styles).toEqual({ borderBottomLeftRadius: 1 })
    expect((await uno.generate('rounded-none')).styles).toEqual({ borderRadius: 0 })
    expect((await uno.generate('rounded-bl-none')).styles).toEqual({ borderBottomLeftRadius: 0 })
  })
})
