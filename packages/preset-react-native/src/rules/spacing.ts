import type { CSSObject, DynamicMatcher, Rule, RuleContext } from '@unorn/core'
import type { Theme } from '../theme'
import { directionMap } from '../utils/mappings'
import { h } from '../utils/handlers'

function directionSize(propertyPrefix: 'margin' | 'padding'): DynamicMatcher {
  return ([_, direction, size]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined => {
    const v = theme?.[propertyPrefix]?.[size] ?? theme.spacing?.[size || 'DEFAULT'] ?? h.bracket.auto.fraction.number(size)
    if (v != null)
      return { [`${propertyPrefix}${directionMap[direction]}`]: v }
  }
}

export const spacing: Rule<Theme>[] = [
  // padding
  [/^pa?()-?(-?.+)$/, directionSize('padding')],
  [/^p-?xy()()$/, directionSize('padding')],
  [/^p-?([xy])(?:-?(-?.+))?$/, directionSize('padding')],
  [/^p-?([rltbse])(?:-?(-?.+))?$/, directionSize('padding')],

  // marign
  [/^ma?()-?(-?.+)$/, directionSize('margin')],
  [/^m-?xy()()$/, directionSize('margin')],
  [/^m-?([xy])(?:-?(-?.+))?$/, directionSize('margin')],
  [/^m-?([rltbse])(?:-?(-?.+))?$/, directionSize('margin')],

]
