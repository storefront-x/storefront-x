import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
      '#ioc': path.resolve(__dirname, './.sfx/ioc'),
    },
  },
})
