import { defineConfig } from 'vitest/config'
import { alias } from './alias'

export default defineConfig({
  resolve: {
    alias,
  },
  test: {
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): false | void {
      if (log === 'message from third party library' && type === 'stdout')
        return false
    },
    coverage: {
      provider: 'v8',
      include: [
        'packages/*',
      ],
    },
  },
})
