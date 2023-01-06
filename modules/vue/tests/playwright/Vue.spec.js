import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('basic application', async ({ page }) => {
  await makeProject(
    {
      modules: ['@storefront-x/base', '@storefront-x/vue'],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, Storefront X!')
    },
  )
})

test('basic interactivity', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            base: {
              templates: {
                'App.vue': `
                  <template>
                    <button @click="count++">{{ count }}</button>
                  </template>
                  <script setup>
                  import { ref } from 'vue'
                  const count = ref(0)
                  </script>
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('button')).toContainText('0')
      await page.locator('button').click()
      await expect(page.locator('button')).toContainText('1')
    },
  )
})

test('overriding of App.vue', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            base: {
              templates: {
                'App.vue': '<template><h1>Overrided</h1></template>',
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Overrided')
    },
  )
})

test('hot module reloading of App.vue', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            base: {
              templates: {
                'App.vue': '<template><h1>Overrided</h1></template>',
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await writeFile('my-module/base/templates/App.vue', '<template><h1>HMR</h1></template>')
      await expect(page.locator('h1')).toContainText('HMR')
    },
  )
})
