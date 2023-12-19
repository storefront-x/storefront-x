import { defineConfig } from 'vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

export default () =>
  defineConfig({
    plugins: [
      VueI18n({
        strictMessage: false, // this allows use of HTML in the translations
      }),
    ],
    ssr: {
      noExternal: ['vue-i18n'],
    },
  })
