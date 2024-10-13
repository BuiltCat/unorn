// import { isIdentifier, jsxIdentifier } from '@babel/types'
// import { addNamed } from '@babel/helper-module-imports'
import type * as BabelCore from '@babel/core'
import { isJSXIdentifier } from '@babel/types'

// const allowedFileRegex
//     = /^(?!.*[\/\\](react|react-native|react-native-web|react-native-css-interop)[\/\\]).*$/

// const importMeta = ['createInteropElement', 'unorn']

const plugin = function (babel: typeof BabelCore): BabelCore.PluginObj {
  return {
    name: 'auto-unorn-import',
    visitor: {
      JSXElement(path, state) {
        if (isJSXIdentifier(path.node.openingElement.name)) {
          const scope = path.hub.file.scope.getBinding(path.node.openingElement.name.name)
          console.log('look at: scope', scope)
          console.log('look at:', path.node.openingElement.name)
        }
      },
      // jsxIdentifier(path, state) {
      //     // console.log('look at:', path, state)
      // },
      // MemberExpression(path, state) {
      //     // if (
      //     //     allowedFileRegex.test(state.filename) &&
      //     //     isIdentifier(path.node.property, { name: "createElement" })
      //     // ) {
      //     //     console.log('look at:', state.filename);
      //     // }
      // },
      // Identifier(path, state) {
      //     if (
      //         allowedFileRegex.test(state.filename) &&
      //         path.node.name === "createElement" &&
      //         path.parentPath.isCallExpression()
      //         // isImportedFromReact(path.scope.getBinding("createElement"))
      //     ) {
      //         console.log('look at:', state.filename);
      //         path.replaceWith(addNamed(path, ...importMeta));
      //     }
      // },
    },
  }
}

export default plugin
