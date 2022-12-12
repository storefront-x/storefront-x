import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

export default (core) =>
  defineConfig({
    plugins: [
      VueI18n({
        include: resolve(core.rootDir, './.sfx/i18n/messages/**'),
      }),
    ],
  })
