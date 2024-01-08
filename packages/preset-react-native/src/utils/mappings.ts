export const borderDirectionMap: Record<string, string[]> = {
  'l': ['Left'],
  'r': ['Right'],
  't': ['Top'],
  'b': ['Bottom'],
  's': ['Start'],
  'e': ['End'],
  'x': ['Left', 'Right'],
  'y': ['Top', 'Bottom'],
  '': [''],
}

export const directionMap: Record<string, 'Left' | 'Right' | 'Top' | 'Bottom' | 'Start' | 'End' | 'Horizontal' | 'Vertical' | ''> = {
  'l': 'Left',
  'r': 'Right',
  't': 'Top',
  'b': 'Bottom',
  's': 'Start',
  'e': 'End',
  'x': 'Horizontal',
  'y': 'Vertical',
  '': '',
}

export const sizeMapping: Record<string, 'height' | 'width'> = {
  h: 'height',
  w: 'width',
}
