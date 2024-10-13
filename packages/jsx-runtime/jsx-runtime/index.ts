import { forwardRef, createElement as originalCreateElement } from 'react'
import ReactJSXRuntime from 'react/jsx-runtime'
import { View } from 'react-native'
import { UnornContainer } from './UnornContainer'
import type { Mapping } from './interface'

const elementMap = new Map()

const ForwardRefSymbol = Symbol.for('react.forward_ref')
export function getComponentType(component: any) {
  switch (typeof component) {
    case 'function':
    case 'object':
      return '$$typeof' in component && component.$$typeof === ForwardRefSymbol
        ? 'forwardRef'
        : component.prototype?.isReactComponent
          ? 'class'
          : typeof component
    default:
      return 'unknown'
  }
}

const withClassToStyle = function (baseComponent: any, mapping?: Mapping) {
  const type = getComponentType(baseComponent)
  let component
  if (type === 'function') {
    component = (props: Record<string, any>) => {
      return UnornContainer(baseComponent, props, mapping)
    }
  }
  else {
    component = forwardRef((props, ref) => {
      return UnornContainer(baseComponent, props, mapping, ref)
    })
  }

  elementMap.set(baseComponent, component)
}

function applyUnornToCreate(jsx: any) {
  return function (type: any, props: any, ...rest: any[]) {
    withClassToStyle(View, [{ original: 'className', target: 'style' }])
    // console.log('look at: 123', { jsx, type, props, rest })
    // This is invalid react code. Its used by the doctor to check if the JSX pragma is set correctly
    // if ((type as any) === 'react-native-css-interop-jsx-pragma-check')
    //   return true as any

    // // Load the core React Native components and create the interop versions
    // // We avoid this in the test environment as we want more fine-grained control
    // // This call also need to be inside the JSX transform to avoid circular dependencies
    // if (process.env.NODE_ENV !== 'test')
    //   require('./components')

    // // You can disable the css interop by setting `cssInterop` to false
    // if (props && props.cssInterop === false) {
    //   delete props.cssInterop
    // }
    // else {
    //   // Swap the component type with the interop version if it exists
    type = elementMap.get(type) ?? type
    // }

    // Call the original jsx function with the new type
    // if (typeof type === 'string')

    return jsx.call(jsx, type, props, ...rest)
  }
}
export { Fragment } from 'react'
export const jsxDEV = applyUnornToCreate((ReactJSXRuntime as any).jsxDEV)
export const jsx = applyUnornToCreate((ReactJSXRuntime as any).jsx)
export const jsxs = applyUnornToCreate((ReactJSXRuntime as any).jsxs)
export const createElement = originalCreateElement
