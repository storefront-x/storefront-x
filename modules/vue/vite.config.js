//@ts-check

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue({
      template: {
        transformAssetUrls: false,
      },
    }),
  ],
  optimizeDeps: {
    include: ['cookie'],
  },
  resolve: {
    alias: {
      // This alias is needed for the NPM create script to work
      'vue-demi': 'vue-demi/lib/v3/index.mjs',
    },
  },
})
