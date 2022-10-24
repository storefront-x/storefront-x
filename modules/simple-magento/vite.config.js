import { defineConfig } from 'vite'
import tailwind from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'

export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: false,
  },
  css: {
    postcss: {
      plugins: [tailwind({ config: tailwindConfig })],
    },
  },
})
