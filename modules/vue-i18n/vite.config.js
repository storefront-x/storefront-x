import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

export default (core) =>
  defineConfig({
    plugins: [
      vueI18n({
        include: resolve(core.rootDir, './.sfx/i18n/messages/**'),
      }),
    ],
  })
