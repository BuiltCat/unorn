import type { DimensionValue } from 'react-native'

export interface Theme {
  aspectRatio?: Record<string, string | number>
  backgroundColor?: Record<string, string | Record<string, string>>
  colors?: Record<string, string | Record<string, string>>
  textColor?: Record<string, string | Record<string, string>>
  borderColor?: Record<string, string | Record<string, string>>
  fontFamily?: Record<string, string>
  borderWidth?: Record<string, number>
  zIndex?: Record<string, number>
  spacing?: Record<string, number | string>
  width?: Record<string, string | number>
  height?: Record<string, string | number>
  maxWidth?: Record<string, string | number>
  maxHeight?: Record<string, string | number>
  minWidth?: Record<string, string | number>
  minHeight?: Record<string, string | number>
  borderRadius?: Record<string, number>
  fontSize?: Record<string, number>
  fontWeight?: Record<string, 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal'>
  lineHeight?: Record<string, number>
  letterSpacing?: Record<string, number>
  flexGrow?: Record<string, number>
  flexBasis?: Record<string, DimensionValue>
  flexShrink?: Record<string, number>
  gap?: Record<string, number>
  padding?: Record<string, number>
  margin?: Record<string, number>
  opacity?: Record<string, number>
}
