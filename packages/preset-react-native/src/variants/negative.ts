import type { CSSObject, Variant } from '@unorn/core'
import { numberRE } from '../utils/handlers/regex'

export function negativePercent(str: string) {
  if (str.endsWith('%'))
    str = str.slice(0, -1)
  if (!numberRE.test(str))
    return
  const num = -Number.parseFloat(str)
  if (!Number.isNaN(num))
    return `${num}%`
}

export const variantNegative: Variant = {
  name: 'negative',
  match(matcher) {
    if (!matcher.startsWith('-'))
      return

    return {
      matcher: matcher.slice(1),
      body: (body) => {
        let changed = false
        Object.keys(body).forEach((key) => {
          const value = body[key as keyof CSSObject]
          if (typeof value === 'number') {
            (body[key as keyof CSSObject] as any) = -value
            changed = true
          }

          if (typeof value === 'string') {
            const nextValue = negativePercent(value)
            if (nextValue) {
              (body[key as keyof CSSObject] as any) = nextValue
              changed = true
            }
          }
        })
        if (changed)
          return body
      },
    }
  },
}
