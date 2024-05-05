import { colors } from './colors'
import { fontFamily } from './font'
import type { Theme } from './types'

export const theme: Theme = {
  aspectRatio: {
    square: '1/1',
    video: '16/9',
    auto: 'auto',
  },
  colors,
  fontFamily,
  borderRadius: {
    none: 0,
  },
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
    thin: '100',
    extralight: '200',
    light: '300',
    medium: '500',
    semibold: '600',
    extrabold: '800',
    black: '900',
  },
  gap: {
    px: 1,
  },
  letterSpacing: {
    normal: 0,
    tighter: -2,
    tight: -1,
    wide: 1,
    wider: 2,
    widest: 3,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
}
