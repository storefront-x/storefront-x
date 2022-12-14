import { expect, test } from '@playwright/test'
import { makeProject, wrapConsole } from '@storefront-x/testing'

test('magento error handling is working', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router-simple',
        '@storefront-x/vue-i18n',
        '@storefront-x/vue-pinia',
        '@storefront-x/base-commerce',
        '@storefront-x/graphql',
        '@storefront-x/magento',
        [
          'my-module',
          {
            components: {
              'Error.vue': `
                <template></template>
                <script setup>
                  import MagentoError from '#ioc/errors/MagentoError'

                  throw new MagentoError({
                    message: 'Error message has been sent!'
                  })
                </script>
              `,
            },
            pages: {
              'index.vue': `
                <template>
                  <Error />
                  <p v-if="notification.notifications" id="errMsg">{{ notification.notifications[0].message }}</p>
                </template>
                <script setup>
                  import Error from '#ioc/components/Error'
                  import useNotificationStore from '#ioc/stores/useNotificationStore'

                  const notification = useNotificationStore()
                </script>
              `,
            },
            config: {
              'MAGENTO_URL.ts': `export default '/'`,
              'VUE_I18N_LOCALES.ts': `
                export default [
                  {
                    name: 'en',
                    locale: 'en-US',
                    prefix: '/',
                  }
                ]
              `,
            },
            stores: {
              'useMagentoStore.ts': `
                import { defineStore } from 'pinia'
                export default defineStore('magentoStore', {});
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await wrapConsole(async () => {
        await page.goto(url, { waitUntil: 'networkidle' })
        await expect(page.locator('#errMsg')).toContainText('Error message has been sent!')
      })
    },
  )
})

test('magento error messages translation is working', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router-simple',
        '@storefront-x/vue-i18n',
        '@storefront-x/vue-pinia',
        '@storefront-x/base-commerce',
        '@storefront-x/graphql',
        '@storefront-x/magento',
        [
          'my-module',
          {
            components: {
              'Error.vue': `
                <template></template>
                <script setup>
                  import MagentoError from '#ioc/errors/MagentoError'

                  throw new MagentoError({
                    message: 'Cannot create a newsletter subscription.'
                  })
                </script>
              `,
            },
            pages: {
              'index.vue': `
                <template>
                  <Error />
                  <p v-if="notification.notifications" id="errMsg">{{ notification.notifications[0].message }}</p>
                </template>
                <script setup>
                  import Error from '#ioc/components/Error'
                  import useNotificationStore from '#ioc/stores/useNotificationStore'

                  const notification = useNotificationStore()
                </script>
              `,
            },
            config: {
              'MAGENTO_URL.ts': `export default '/'`,
              'VUE_I18N_LOCALES.ts': `
                export default [
                  {
                    name: 'en',
                    locale: 'en-US',
                    prefix: '/',
                  },
                  {
                    name: 'cz',
                    locale: 'cs-CZ',
                    prefix: '/cz',
                  },
                ]
              `,
            },
            i18n: {
              messages: {
                'en-US.json': `
                  {
                    "errors": {
                      "Cannot create a newsletter subscription.": "Cannot create a newsletter subscription."
                    }
                  }
                `,
                'cs-CZ.json': `
                  {
                    "errors": {
                      "Cannot create a newsletter subscription.": "Nelze vytvo??it odb??r newsletteru."
                    }
                  }
                `,
              },
            },
            stores: {
              'useMagentoStore.ts': `
                import { defineStore } from 'pinia'
                export default defineStore('magentoStore', {});
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await wrapConsole(async () => {
        await page.goto(url, { waitUntil: 'networkidle' })
        await expect(page.locator('#errMsg')).toContainText('Cannot create a newsletter subscription.')
        await page.goto(url + '/cz', { waitUntil: 'networkidle' })
        await expect(page.locator('#errMsg')).toContainText('Nelze vytvo??it odb??r newsletteru.')
      })
    },
  )
})
