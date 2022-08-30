import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('render store properties', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-i18n',
        [
          'app',
          {
            config: {
              'VUE_I18N_LOCALES.ts': `export default [
                {
                    fullName: 'English',
                    name: 'en',
                    locale: 'en-US',
                    prefix: '/',
                    flag: '/flags/1x1/us.svg',
                    magentoStore: 'b2c_en',
                  },
              ]
              `,
            },
            pages: {
              'index.vue': `
                  <template>
                    <h1>{{ fullName }}</h1>
                  </template>
                  <script setup>
                  import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
                  import { computed } from 'vue'

                  const fullName = computed(() => VUE_I18N_LOCALES[0].fullName)
                  </script>
                `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('<h1>English</h1>')
    },
  )
})
