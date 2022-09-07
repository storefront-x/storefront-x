import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('transfer of state', async ({ page }) => {
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
                    <h1>{{ counter }}</h1>
                  </template>
                  <script setup>
                  import IS_SERVER from '#ioc/config/IS_SERVER'
                  import useState from '#ioc/composables/useState'

                  const counter = useState('counter', () => 1)

                  if (IS_SERVER) {
                    counter.value++
                  }
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
      await expect(await page.content()).toContain('<h1>2</h1>')
      await expect(page.locator('h1')).toContainText('2')
    },
  )
})

test('state remains reactive', async ({ page }) => {
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
                    <h1>{{ counter }}</h1>
                    <button @click="counter++">Button</button>
                  </template>
                  <script setup>
                  import useState from '#ioc/composables/useState'

                  const counter = useState('counter', () => 1)
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
      await page.locator('button').click()
      await expect(page.locator('h1')).toContainText('2')
    },
  )
})
