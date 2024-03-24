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
      extend: {
        flexBasis: {
          '1/7': '14.2857143%',
          '2/7': '28.5714286%',
          '3/7': '42.8571429%',
          '4/7': '57.1428571%',
          '5/7': '71.4285714%',
          '6/7': '85.7142857%',
          '1/1': '120%',
        },
        flexGrow: {
          base: 1,
        },
        flexShrink: {
          base: 1,
        },
      },
    },
  })

  // flex
  it('flex basis', async () => {
    expect((await uno.generate('basis-0')).styles).toEqual({ flexBasis: 0 })
    expect((await uno.generate('basis-1')).styles).toEqual({ flexBasis: 1 })
    expect((await uno.generate('basis-1/2')).styles).toEqual({ flexBasis: '50%' })
    expect((await uno.generate('basis-0/2')).styles).toEqual({ flexBasis: 0 })
    expect((await uno.generate('basis-full')).styles).toEqual({ flexBasis: '100%' })
    expect((await uno.generate('basis-11/12')).styles).toEqual({ flexBasis: '91.6666666667%' })
    expect((await uno.generate('basis-1/7')).styles).toEqual({ flexBasis: '14.2857143%' })
    expect((await uno.generate('basis-[12.43%]')).styles).toEqual({ flexBasis: '12.43%' })
    expect((await uno.generate('basis-1/1')).styles).toEqual({ flexBasis: '120%' })
    expect((await uno.generate('basis-base')).styles).toEqual({ flexBasis: 1 })
    expect((await uno.generate('basis-auto')).styles).toEqual({ flexBasis: 'auto' })
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
    expect((await uno.generate('grow-3.2')).styles).toEqual({ flexGrow: 3.2 })
    expect((await uno.generate('grow-[3.2]')).styles).toEqual({ flexGrow: 3.2 })
    expect((await uno.generate('grow-base')).styles).toEqual({ flexGrow: 1 })
  })

  it('flex shrink', async () => {
    expect((await uno.generate('shrink')).styles).toEqual({ flexShrink: 1 })
    expect((await uno.generate('shrink-0')).styles).toEqual({ flexShrink: 0 })
    expect((await uno.generate('shrink-3')).styles).toEqual({ flexShrink: 3 })
    expect((await uno.generate('shrink-3.2')).styles).toEqual({ flexShrink: 3.2 })
    expect((await uno.generate('shrink-base')).styles).toEqual({ flexShrink: 1 })
    expect((await uno.generate('shrink-[2]')).styles).toEqual({ flexShrink: 2 })
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
    expect((await uno.generate('gap-base')).styles).toEqual({ gap: 1 })
    expect((await uno.generate('gap-x-base')).styles).toEqual({ columnGap: 1 })
    expect((await uno.generate('gap-y-base')).styles).toEqual({ rowGap: 1 })
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
})
