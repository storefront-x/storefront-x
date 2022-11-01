//@ts-check

import { defineConfig } from 'vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

export default defineConfig({
  plugins: [vueI18n()],
})
