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
      padding: {
        xl: 5,
      },
      margin: {
        xl: 5,
      },
    },
  })

  it('padding', async () => {
    expect((await uno.generate('p-0')).styles).toEqual({ padding: 0 })
    expect((await uno.generate('p-10')).styles).toEqual({ padding: 10 })
    expect((await uno.generate('p-20')).styles).toEqual({ padding: 20 })
    expect((await uno.generate('p-30')).styles).toEqual({ padding: 30 })

    expect((await uno.generate('px-0')).styles).toEqual({ paddingHorizontal: 0 })
    expect((await uno.generate('px-10')).styles).toEqual({ paddingHorizontal: 10 })
    expect((await uno.generate('px-20')).styles).toEqual({ paddingHorizontal: 20 })
    expect((await uno.generate('px-30')).styles).toEqual({ paddingHorizontal: 30 })

    expect((await uno.generate('py-0')).styles).toEqual({ paddingVertical: 0 })
    expect((await uno.generate('py-10')).styles).toEqual({ paddingVertical: 10 })
    expect((await uno.generate('py-20')).styles).toEqual({ paddingVertical: 20 })
    expect((await uno.generate('py-30')).styles).toEqual({ paddingVertical: 30 })

    expect((await uno.generate('pt-0')).styles).toEqual({ paddingTop: 0 })
    expect((await uno.generate('pt-10')).styles).toEqual({ paddingTop: 10 })
    expect((await uno.generate('pt-20')).styles).toEqual({ paddingTop: 20 })
    expect((await uno.generate('pt-30')).styles).toEqual({ paddingTop: 30 })

    expect((await uno.generate('pr-0')).styles).toEqual({ paddingRight: 0 })
    expect((await uno.generate('pr-10')).styles).toEqual({ paddingRight: 10 })
    expect((await uno.generate('pr-20')).styles).toEqual({ paddingRight: 20 })
    expect((await uno.generate('pr-30')).styles).toEqual({ paddingRight: 30 })

    expect((await uno.generate('pb-0')).styles).toEqual({ paddingBottom: 0 })
    expect((await uno.generate('pb-10')).styles).toEqual({ paddingBottom: 10 })
    expect((await uno.generate('pb-20')).styles).toEqual({ paddingBottom: 20 })
    expect((await uno.generate('pb-30')).styles).toEqual({ paddingBottom: 30 })

    expect((await uno.generate('pl-0')).styles).toEqual({ paddingLeft: 0 })
    expect((await uno.generate('pl-10')).styles).toEqual({ paddingLeft: 10 })
    expect((await uno.generate('pl-20')).styles).toEqual({ paddingLeft: 20 })
    expect((await uno.generate('pl-30')).styles).toEqual({ paddingLeft: 30 })

    expect((await uno.generate('ps-0')).styles).toEqual({ paddingStart: 0 })
    expect((await uno.generate('ps-10')).styles).toEqual({ paddingStart: 10 })
    expect((await uno.generate('ps-20')).styles).toEqual({ paddingStart: 20 })
    expect((await uno.generate('ps-30')).styles).toEqual({ paddingStart: 30 })

    expect((await uno.generate('pe-0')).styles).toEqual({ paddingEnd: 0 })
    expect((await uno.generate('pe-10')).styles).toEqual({ paddingEnd: 10 })
    expect((await uno.generate('pe-20')).styles).toEqual({ paddingEnd: 20 })
    expect((await uno.generate('pe-30')).styles).toEqual({ paddingEnd: 30 })

    expect((await uno.generate('p-base')).styles).toEqual({ padding: 1 })
    expect((await uno.generate('px-base')).styles).toEqual({ paddingHorizontal: 1 })
    expect((await uno.generate('py-base')).styles).toEqual({ paddingVertical: 1 })
    expect((await uno.generate('pt-base')).styles).toEqual({ paddingTop: 1 })
    expect((await uno.generate('pr-base')).styles).toEqual({ paddingRight: 1 })
    expect((await uno.generate('pb-base')).styles).toEqual({ paddingBottom: 1 })
    expect((await uno.generate('pl-base')).styles).toEqual({ paddingLeft: 1 })
    expect((await uno.generate('ps-base')).styles).toEqual({ paddingStart: 1 })
    expect((await uno.generate('pe-base')).styles).toEqual({ paddingEnd: 1 })

    expect((await uno.generate('p-xl')).styles).toEqual({ padding: 5 })
    expect((await uno.generate('px-xl')).styles).toEqual({ paddingHorizontal: 5 })
    expect((await uno.generate('py-xl')).styles).toEqual({ paddingVertical: 5 })
    expect((await uno.generate('pt-xl')).styles).toEqual({ paddingTop: 5 })
    expect((await uno.generate('pr-xl')).styles).toEqual({ paddingRight: 5 })
    expect((await uno.generate('pb-xl')).styles).toEqual({ paddingBottom: 5 })
    expect((await uno.generate('pl-xl')).styles).toEqual({ paddingLeft: 5 })
    expect((await uno.generate('ps-xl')).styles).toEqual({ paddingStart: 5 })
    expect((await uno.generate('pe-xl')).styles).toEqual({ paddingEnd: 5 })
  })

  it('margin', async () => {
    expect((await uno.generate('m-0')).styles).toEqual({ margin: 0 })
    expect((await uno.generate('m-10')).styles).toEqual({ margin: 10 })
    expect((await uno.generate('m-20')).styles).toEqual({ margin: 20 })
    expect((await uno.generate('m-30')).styles).toEqual({ margin: 30 })

    expect((await uno.generate('mx-0')).styles).toEqual({ marginHorizontal: 0 })
    expect((await uno.generate('mx-10')).styles).toEqual({ marginHorizontal: 10 })
    expect((await uno.generate('mx-20')).styles).toEqual({ marginHorizontal: 20 })
    expect((await uno.generate('mx-30')).styles).toEqual({ marginHorizontal: 30 })

    expect((await uno.generate('my-0')).styles).toEqual({ marginVertical: 0 })
    expect((await uno.generate('my-10')).styles).toEqual({ marginVertical: 10 })
    expect((await uno.generate('my-20')).styles).toEqual({ marginVertical: 20 })
    expect((await uno.generate('my-30')).styles).toEqual({ marginVertical: 30 })

    expect((await uno.generate('mt-0')).styles).toEqual({ marginTop: 0 })
    expect((await uno.generate('mt-10')).styles).toEqual({ marginTop: 10 })
    expect((await uno.generate('mt-20')).styles).toEqual({ marginTop: 20 })
    expect((await uno.generate('mt-30')).styles).toEqual({ marginTop: 30 })

    expect((await uno.generate('mr-0')).styles).toEqual({ marginRight: 0 })
    expect((await uno.generate('mr-10')).styles).toEqual({ marginRight: 10 })
    expect((await uno.generate('mr-20')).styles).toEqual({ marginRight: 20 })
    expect((await uno.generate('mr-30')).styles).toEqual({ marginRight: 30 })

    expect((await uno.generate('mb-0')).styles).toEqual({ marginBottom: 0 })
    expect((await uno.generate('mb-10')).styles).toEqual({ marginBottom: 10 })
    expect((await uno.generate('mb-20')).styles).toEqual({ marginBottom: 20 })
    expect((await uno.generate('mb-30')).styles).toEqual({ marginBottom: 30 })

    expect((await uno.generate('ml-0')).styles).toEqual({ marginLeft: 0 })
    expect((await uno.generate('ml-10')).styles).toEqual({ marginLeft: 10 })
    expect((await uno.generate('ml-20')).styles).toEqual({ marginLeft: 20 })
    expect((await uno.generate('ml-30')).styles).toEqual({ marginLeft: 30 })

    expect((await uno.generate('ms-0')).styles).toEqual({ marginStart: 0 })
    expect((await uno.generate('ms-10')).styles).toEqual({ marginStart: 10 })
    expect((await uno.generate('ms-20')).styles).toEqual({ marginStart: 20 })
    expect((await uno.generate('ms-30')).styles).toEqual({ marginStart: 30 })

    expect((await uno.generate('me-0')).styles).toEqual({ marginEnd: 0 })
    expect((await uno.generate('me-10')).styles).toEqual({ marginEnd: 10 })
    expect((await uno.generate('me-20')).styles).toEqual({ marginEnd: 20 })
    expect((await uno.generate('me-30')).styles).toEqual({ marginEnd: 30 })

    expect((await uno.generate('m-base')).styles).toEqual({ margin: 1 })
    expect((await uno.generate('mx-base')).styles).toEqual({ marginHorizontal: 1 })
    expect((await uno.generate('my-base')).styles).toEqual({ marginVertical: 1 })
    expect((await uno.generate('mt-base')).styles).toEqual({ marginTop: 1 })
    expect((await uno.generate('mr-base')).styles).toEqual({ marginRight: 1 })
    expect((await uno.generate('mb-base')).styles).toEqual({ marginBottom: 1 })
    expect((await uno.generate('ml-base')).styles).toEqual({ marginLeft: 1 })
    expect((await uno.generate('ms-base')).styles).toEqual({ marginStart: 1 })
    expect((await uno.generate('me-base')).styles).toEqual({ marginEnd: 1 })

    expect((await uno.generate('m-xl')).styles).toEqual({ margin: 5 })
    expect((await uno.generate('mx-xl')).styles).toEqual({ marginHorizontal: 5 })
    expect((await uno.generate('my-xl')).styles).toEqual({ marginVertical: 5 })
    expect((await uno.generate('mt-xl')).styles).toEqual({ marginTop: 5 })
    expect((await uno.generate('mr-xl')).styles).toEqual({ marginRight: 5 })
    expect((await uno.generate('mb-xl')).styles).toEqual({ marginBottom: 5 })
    expect((await uno.generate('ml-xl')).styles).toEqual({ marginLeft: 5 })
    expect((await uno.generate('ms-xl')).styles).toEqual({ marginStart: 5 })
    expect((await uno.generate('me-xl')).styles).toEqual({ marginEnd: 5 })
  })
})
