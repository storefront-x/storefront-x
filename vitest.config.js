import path from 'node:path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],
  test: {
    environment: 'jsdom',
    include: ['.sfx/tests/unit/**/*.spec.ts'],
  },
  resolve: {
    alias: {
      '#ioc': path.resolve(__dirname, './.sfx/ioc'),
      '~': path.resolve(__dirname),
    },
  },
})
