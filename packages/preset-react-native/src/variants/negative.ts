import type { CSSObject, Variant } from '@unocss-native/core'

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
            (body[key as keyof CSSObject] as any) = `-${value}`
            changed = true
          }
        })
        if (changed)
          return body
      },
    }
  },
}
