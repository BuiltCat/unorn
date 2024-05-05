import type { CSSObject, Rule, RuleContext } from '@unorn/core'
import type { Theme } from '../theme'
import { h } from '../utils/handlers'

function handlerOpacity([, d]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  const v = theme.opacity?.[d] ?? h.bracket.percent(d)

  if (typeof v === 'number') {
    return {
      opacity: v,
    }
  }
  if (typeof v === 'string') {
    return {
      opacity: Number.parseFloat(v),
    }
  }
}

export const effects: Rule<Theme>[] = [
  [/^opacity-(.+)$/, handlerOpacity],
]
