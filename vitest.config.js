import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['modules/**/tests/unit/*.spec.js'],
  },
  resolve: {
    alias: {
      '#ioc': path.resolve(__dirname, './.sfx/ioc'),
      '~': path.resolve(__dirname),
    },
  },
})
