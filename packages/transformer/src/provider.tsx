import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { createGenerator } from '@unocss-native/core'
import { UnContext } from './context'

interface Props {
  children: unknown
}

export function UnProvider({ children }: Props) {
  const un = useMemo(() => {
    const uno = createGenerator({
      theme: {
        colors: {
          veryCool: '#0000ff', // class="text-very-cool"
          brand: {
            primary: 'hsla(var(--hue, 217), 78%, 51%)', // class="bg-brand-primary"
          },
        },
      },
      rules: [
        ['m-1', { margin: 0.25 }],
        [/^p-(\d+)$/, ([, v]) => ({ padding: Number(v) })],
        [/^backface-([-\w]+)$/, ([, v]) => ({ backfaceVisibility: v })],
      ],
    })

    return (str: string) => {
      const { style } = uno.generate(str)
      console.log('look at:', style)

      return style
    }
  }, [])

  return (
    <UnContext.Provider value={un}>
      {children as ReactNode}
    </UnContext.Provider>
  )
}
