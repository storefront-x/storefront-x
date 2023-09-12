import { defineConfig } from 'vite'
import version from './src/plugins/version'

export default defineConfig({
  plugins: [version()],
})
