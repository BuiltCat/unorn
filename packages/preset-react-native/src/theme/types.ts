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
  width?: Record<string, string>
  height?: Record<string, string>
  maxWidth?: Record<string, string>
  maxHeight?: Record<string, string>
  minWidth?: Record<string, string>
  minHeight?: Record<string, string>
  borderRadius?: Record<string, number>
  fontSize?: Record<string, number>
  fontWeight?: Record<string, 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal'>
  lineHeight?: Record<string, number>
  letterSpacing?: Record<string, number>
  gap?: Record<string, number>
}
