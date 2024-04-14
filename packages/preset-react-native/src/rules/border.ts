import type { CSSObject, Rule, RuleContext } from '@unorn/core'
import type { Theme } from '../theme'
import { h } from '../utils/handlers'
import type { BorderStyle } from '../utils/mappings'
import { borderStyleMap, cornerMap } from '../utils/mappings'

function handlerRounded([, a = '', s]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  let v = theme.borderRadius?.[s || 'DEFAULT']
  if (typeof v !== 'number')
    v = h.bracket.number(s || '1')

  if (a in cornerMap && typeof v === 'number') {
    const props: CSSObject = {}
    cornerMap[a].forEach((i) => {
      props[`border${i}Radius`] = v
    })
    return props
  }
}

function isBoderSytleString(str: string): str is BorderStyle {
  return borderStyleMap.includes(str)
}

export function handlerBorderStyle([, s]: string[]): CSSObject | undefined {
  if (isBoderSytleString(s)) {
    return {
      borderStyle: s,
    }
  }
}

export const border: Rule<Theme>[] = [
  // borderTopLeftRadius borderBottomLeftRadius borderTopRightRadius borderBottomRightRadius borderStartStartRadius borderStartEndRadius borderEndStartRadius borderEndEndRadius
  [/^(?:rounded)()(?:-(.+))?$/, handlerRounded],
  [/^(?:rounded)-([rltbse])(?:-(.+))?$/, handlerRounded],
  [/^(?:rounded)-([rltb]{2})(?:-(.+))?$/, handlerRounded],
  [/^(?:rounded)-([bise][se])(?:-(.+))?$/, handlerRounded],

  // borderStyle
  [/^(?:border)-(.+)$/, handlerBorderStyle],
]
