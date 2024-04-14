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
  },
  gap: {
    px: 1,
  },
}
