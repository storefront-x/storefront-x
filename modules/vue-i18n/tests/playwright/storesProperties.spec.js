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
          'my-module',
          {
            config: {
              'VUE_I18N_LOCALES.ts': `export default [
                {
                    fullName: 'English',
                    name: 'en',
                    locale: 'en-US',
                    prefix: '/',
                    magentoStore: 'b2c_en',
                  },
                  {
                    fullName: 'Czech',
                    name: 'cz',
                    locale: 'cs-CZ',
                    prefix: '/cz',
                    magentoStore: 'b2c_cz',
                  },
              ]
              `,
            },
            pages: {
              'index.vue': `
                  <template>
                    <h1>{{ fullName }}</h1>
                    <button id="switch" @click.prevent="change">click</button>
                  </template>
                  <script setup>
                  import { computed } from 'vue'
                  import useCurrentLocale from '#ioc/composables/useCurrentLocale'
                  import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'

                  const currentLocale = useCurrentLocale()
                  const switchLocalePath = useSwitchLocalePath()

                  function change() {
                    window.location.href = switchLocalePath('cz')
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
      await expect(page.locator('h1')).toContainText('English')
      await page.locator('#switch').click()
      await expect(page.locator('h1')).toContainText('Czech')
    },
  )
})
