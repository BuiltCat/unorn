import { Text, View } from 'react-native'

// import { createGenerator } from '@unorn/core'
// impot type { Theme } from '@unorn/preset-react-native'
// import { presetReactNative } from '@unorn/preset-react-native'
import { useEffect, useState } from 'react'

// const uno = createGenerator<Theme>({
//   presets: [presetReactNative()],
//   theme: {
//     opacity: {
//       easy: 0.66,
//     },
//   },
// })

// const u = async (tokens: string) => {
//   const {styles} = await uno.generate(tokens)
//   return styles
// }

function n() {
  return new Promise((res) => {
    setTimeout(() => {
      res('flex p-10 bg-black p-2 p-3 p-5 p-6 p-7')
    }, 1000)
  })
}

function DDD() {
  const [styles, setStyles] = useState('')
  useEffect(() => {
    (async () => {
      const s = await n()
      setStyles(s)
      console.log('look at:', s)
    })()
  }, [])

  return (
    <View
      className={styles}
    >
      <Text>Edit app/index.tsx to edit this screen12222222213123123213123123123123.</Text>
    </View>
  )
}

export default function Index() {
  return (
    <DDD></DDD>
  )
}
