import { transform } from '@babel/core'
import plugin from '@unorn/babel-auto-unorn-import'
import { describe, expect, it } from 'vitest'

describe('babel-auto-unorn-import', () => {
  function getTransformCode(source: string) {
    const code = transform(source, {
      plugins: [[plugin], ['@babel/plugin-transform-react-jsx-development', {
        throwIfNamespace: false, // defaults to truetransform-react-jsx
        runtime: 'automatic', // defaults to classic
        importSource: '@unorn/babel-auto-unorn-import', // defaults to react
      }]],
      configFile: false,
    })?.code
    return code
  }

  it('test', () => {
    expect(getTransformCode(`
  import { createElement, Component } from 'rax';
  import { View } from 'react-native';
  
  class App extends Component {
    render() {
      return <View />;
      return <div className="header" />;
    }
  }`)).toMatchSnapshot()
  })
})
