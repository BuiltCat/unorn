

export interface Colors {
  [key: string]: Colors | string
}

export interface Theme {
  colors: Colors,
  fontFamily?: Record<string, string>,
  borderWidth: Record<string, number>,
  zIndex: Record<string, number>,
  spacing: Record<string, number | string>
}