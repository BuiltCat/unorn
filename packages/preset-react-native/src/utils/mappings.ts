export const borderDirectionMap: Record<string, ('Left' | 'Right' | 'Top' | 'Bottom' | 'Start' | 'End' | '')[]> = {
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

export const cornerMap: Record<string, ('' | 'TopLeft' | 'BottomLeft' | 'TopRight' | 'BottomRight' | 'StartStart' | 'StartEnd' | 'EndStart' | 'EndEnd')[]> = {
  'l': ['TopLeft', 'BottomLeft'],
  'r': ['TopRight', 'BottomRight'],
  't': ['TopLeft', 'TopRight'],
  'b': ['BottomLeft', 'BottomRight'],
  'tl': ['TopLeft'],
  'lt': ['TopLeft'],
  'tr': ['TopRight'],
  'rt': ['TopRight'],
  'bl': ['BottomLeft'],
  'lb': ['BottomLeft'],
  'br': ['BottomRight'],
  'rb': ['BottomRight'],
  '': [''],
  'bs': ['StartStart', 'StartEnd'],
  'be': ['EndStart', 'EndEnd'],
  's': ['EndStart', 'StartStart'],
  'is': ['EndStart', 'StartStart'],
  'e': ['StartEnd', 'EndEnd'],
  'ie': ['StartEnd', 'EndEnd'],
  'ss': ['StartStart'],
  'se': ['StartEnd'],
  'es': ['EndStart'],
  'ee': ['EndEnd'],
}

export const directions: Record<string, string> = {
  '': '',
  'x': 'column-',
  'y': 'row-',
  'col': 'column-',
  'row': 'row-',
}

export type BorderStyle = 'solid' | 'dotted' | 'dashed'
export const borderStyleMap = ['solid', 'dotted', 'dashed']
