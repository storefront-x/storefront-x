import path from 'node:path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  plugins: [Vue(), VueI18n()],
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
