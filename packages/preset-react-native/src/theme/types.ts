

  export interface Colors {
    [key: string]: Colors | string
  }

export interface Theme {
    colors: Colors,
    fontFamily?: Record<string, string>
}