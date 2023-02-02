//@ts-check

import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['nprogress'],
  },
})
