import type { Rule } from '@unorn/core'
import type { Theme } from '../theme'
import { sizeMapping } from '../utils/mappings'
import { h } from '../utils/handlers'

type SizeProps = 'height' | 'width' | 'minHeight' | 'maxHeight' | 'minWidth' | 'maxWidth'

function getPropName(minmax: string, hw: string) {
  return `${minmax || ''}${sizeMapping[hw]}`.replace(/-(\w)/g, (_, p) => p.toUpperCase()) as SizeProps
}

function getSizeValue(minmax: string, hw: string, theme: Theme, prop: string) {
  const str = getPropName(minmax, hw)
  const v = theme[str]?.[prop] ?? theme.spacing?.[prop]

  if (v != null)
    return v

  return h.bracket.auto.fraction.number(prop)
}

export const size: Rule<Theme>[] = [
  // width height maxHeight minHeight maxWidth minWidth size
  [/^size-(min-|max-)?(.+)$/, ([, m, s], { theme }) => ({ [getPropName(m, 'w')]: getSizeValue(m, 'w', theme, s), [getPropName(m, 'h')]: getSizeValue(m, 'h', theme, s) })],
  [/^(?:size-)?(min-|max-)?([wh])-?(.+)$/, ([, m, w, s], { theme }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme, s) })],
]
