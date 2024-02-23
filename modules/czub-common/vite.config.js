import { defineConfig } from 'vite'
import tailwind from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind({ config: tailwindConfig })],
    },
  },
})
