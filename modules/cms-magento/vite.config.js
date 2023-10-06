// @ts-check

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['perf_hooks', 'url', 'net', 'util', 'vm', 'crypto'],
    },
  },
})
