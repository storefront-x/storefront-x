import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('import of assets via ioc', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            assets: {
              'logo.svg': `<svg></svg>`,
            },
            pages: {
              'index.vue': `
                <template>
                  <img :src="logo">
                </template>
                <script setup lang="ts">
                import logo from '#ioc/assets/logo'
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('img')).toHaveAttribute('src', /my-module\/assets\/logo.svg/)
    },
  )
})

test('overriding of assets via ioc', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            assets: {
              'logo.svg': `<svg></svg>`,
            },
            pages: {
              'index.vue': `
                <template>
                  <img :src="logo">
                </template>
                <script setup lang="ts">
                import logo from '#ioc/assets/logo'
                </script>
              `,
            },
          },
        ],
        [
          'theme',
          {
            assets: {
              'logo.svg': `<svg></svg>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('img')).toHaveAttribute('src', /theme\/assets\/logo.svg/)
    },
  )
})
