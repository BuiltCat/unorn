import { createGenerator } from '@unorn/core'
import { presetReactNative } from '@unorn/preset-react-native'
import { useEffect, useSyncExternalStore } from 'react'
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'

// 改用 cosmiconfig 读取配置文件
const uno = createGenerator({
  presets: [presetReactNative()],
  theme: {
    opacity: {
      easy: 0.66,
    },
  },
})

type OnStoreChange = () => void

interface Store {
  currentState: Map<string, ViewStyle | TextStyle | ImageStyle>
  listeners: OnStoreChange[]
  subscribe(onStoreChange: OnStoreChange): () => void
  getSnapshot(): Map<string, ViewStyle | TextStyle | ImageStyle>
  generate(input: string): void
}

const store: Store = {
  currentState: new Map(),
  listeners: [],
  subscribe(onStoreChange: OnStoreChange) {
    store.listeners.push(onStoreChange)
    return () => {
      const index = store.listeners.indexOf(onStoreChange)
      if (index !== -1)
        store.listeners.splice(index, 1)
    }
  },
  getSnapshot() {
    return store.currentState
  },
  async generate(input: string) {
    const { styles } = await uno.generate(input)
    const nextState = new Map()
    for (const [key, value] of store.currentState)
      nextState.set(key, value)
    nextState.set(input, styles)
    store.currentState = nextState
    store.listeners.forEach(l => l())
  },
}

export const useUnorn = function (className?: string[]) {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot)

  useEffect(() => {
    className?.filter(c => typeof c === 'string').forEach(c => store.generate(c))
  }, [className])

  return className?.map(c => state.has(c) ? state.get(c) : {}) || []
}
