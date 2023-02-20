import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('en translation', async ({ page }) => {
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
              'VUE_I18N_LOCALES.ts': `
                export default [
                  {
                    name: 'en',
                    locale: 'en-US',
                    prefix: '/',
                  },
                ]
              `,
            },
            pages: {
              'index.vue': `
                <template>
                  <h1>{{ t('message') }}</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { t } = useI18n()
                </script>
                <i18n lang="yaml">
                en-US:
                  message: Hello, World!
                </i18n>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Hello, World!')
    },
  )
})

test('navigation loads translations', async ({ page }) => {
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
              'VUE_I18N_LOCALES.ts': `
                export default [
                  {
                    name: 'en',
                    locale: 'en-US',
                    prefix: '/',
                  },
                ]
              `,
            },
            pages: {
              'index.vue': `
                <template>
                  <RouterLink to="/test">Link</RouterLink>
                </template>
              `,
              'test.vue': `
                <template>
                  <h1>{{ t('message') }}</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { t } = useI18n()
                </script>
                <i18n lang="yaml">
                en-US:
                  message: Hello, World!
                </i18n>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.locator('a').click()
      await expect(page.locator('h1')).toContainText('Hello, World!')
    },
  )
})

test('navigating to different locale', async ({ page }) => {
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
            pages: {
              'index.vue': `
                <template>
                  <a href="/cz">Link</a>
                  <h1>{{ t('message') }}</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { t } = useI18n()
                </script>
                <i18n lang="yaml">
                cs-CZ:
                  message: Ahoj svět!
                </i18n>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.locator('a').click()
      await expect(page.locator('h1')).toContainText('Ahoj svět!')
    },
  )
})

test('navigating to different locale of non-index page', async ({ page }) => {
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
            pages: {
              'index.vue': `
                <template>
                  <a href="/cz/test">Link</a>
                </template>
              `,
              'test.vue': `
                <template>
                  <h1>{{ t('message') }}</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { t } = useI18n()
                </script>
                <i18n lang="yaml">
                cs-CZ:
                  message: Ahoj svět!
                </i18n>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.locator('a').click()
      await expect(page.locator('h1')).toContainText('Ahoj svět!')
    },
  )
})

test('navigating to different locale of non-index page in deep structure', async ({ page }) => {
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
            pages: {
              'index.vue': `
                <template>
                  <a href="/cz/folder/test">Link</a>
                </template>
              `,
              'folder': {
                '$layout.vue': `
                    <template>
                    <div id="h1">
                      <SfxPageOutlet />
                    </div>
                    </template>

                    <script setup lang="ts">
                    import SfxPageOutlet from '#ioc/components/SfxPageOutlet'

                    </script>
                  `,
                'test.vue': `
                  <template>
                    <div id="h2">{{ t('message') }}</div>
                  </template>
                  <script setup>
                  import useI18n from '#ioc/composables/useI18n'

                  const { t } = useI18n()
                  </script>
                  <i18n lang="yaml">
                  cs-CZ:
                    message: Ahoj svět!
                  </i18n>
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.locator('a').click()
      expect(await page.content()).toContain('<div id="h1"><div id="h2">Ahoj svět!</div></div>')
      await expect(page.locator('#h2')).toContainText('Ahoj svět!')
    },
  )
})
