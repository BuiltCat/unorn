import { createElement } from 'react'
import { StyleSheet } from 'react-native'
import { useUnorn } from './store'
import type { Mapping } from './interface'

export function UnornContainer(baseComponent: any, originalProps: Record<string, any>, mapping: Mapping = [], ref?: any) {
  const styleList = useUnorn(mapping.map(m => originalProps[m.original]))

  const nextProps = { ...originalProps }

  mapping.forEach((m, i) => {
    if (styleList[i] === undefined)
      return
    nextProps[m.target] = StyleSheet.compose(styleList[i], originalProps[m.target])
  })

  console.log('look at:', nextProps)

  return createElement(baseComponent, { ...nextProps, ref })
}
