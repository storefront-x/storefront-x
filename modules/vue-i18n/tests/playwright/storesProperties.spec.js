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
                  {
                    fullName: 'Czech',
                    name: 'cz',
                    locale: 'cs-CZ',
                    prefix: '/cz',
                    flag: '/flags/1x1/cz.svg',
                    magentoStore: 'b2c_cz',
                  },
              ]
              `,
            },
            pages: {
              'index.vue': `
                  <template>
                    <h1>{{ fullName }}</h1>
                    <a href="#" @click.prevent="change">click</a>
                  </template>
                  <script setup>
                  import { computed } from 'vue'
                  import useCurrentLocale from '#ioc/composables/useCurrentLocale'
                  import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'

                  const currentLocale = useCurrentLocale()
                  const switchLocalePath = useSwitchLocalePath()

                  function change() {
                    window.location.href = switchLocalePath('cz').fullPath
                  }
                  const fullName = computed(() => currentLocale.value.fullName)
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
      await page.locator('a').click()
      await expect(await page.content()).toContain('<h1>Czech</h1>')
    },
  )
})
