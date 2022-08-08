//@ts-check

import { defineConfig } from 'vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

export default defineConfig({
  plugins: [
    vueI18n({
      // vue-i18n v9 (for Vue 3) crashes in production mode when
      // fallback language messages are used as formatting keys
      // if message compiler is not included
      runtimeOnly: false,
    }),
  ],
})
