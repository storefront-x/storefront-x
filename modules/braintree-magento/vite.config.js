//@ts-check

import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['braintree-web', 'braintree-web-drop-in'],
  },
})
