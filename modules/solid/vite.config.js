//@ts-check

import { defineConfig } from 'vite'
import Solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [Solid({ ssr: true })],
})
