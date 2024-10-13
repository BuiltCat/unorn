const { isIdentifier, jsxIdentifier } = require('@babel/types')
const { addNamed } = require('@babel/helper-module-imports')

const allowedFileRegex
    = /^(?!.*[\/\\](react|react-native|react-native-web|react-native-css-interop)[\/\\]).*$/

const importMeta = ['createInteropElement', 'unorn']

module.exports = function ({ types: t }) {
  return {
    name: 'auto-unorn-import',
    visitor: {
      jsxIdentifier(path, state) {
        console.log('look at:', path, state)
      },
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
