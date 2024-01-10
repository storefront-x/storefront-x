import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test.only('downloading async data on the server side', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>{{ message }}</h1>
                </template>
                <script setup lang="ts">
                import useResource from '#ioc/composables/useResource'

                const [message] = await useResource(async () => {
                  await new Promise((resolve) => setTimeout(resolve, 250))
                  return 'Hello, World!'
                })
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url)
      expect(await response.text()).toContain('<h1>Hello, World!</h1>')
    },
  )
})

test.only('allows refetching', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <button data-testid="button" @click="refetch">Count: {{ count }}</button>
                </template>
                <script setup lang="ts">
                import useResource from '#ioc/composables/useResource'

                let cnt = 0

                const [count, { refetch }] = await useResource(async () => {
                  cnt += 1
                  await new Promise((resolve) => setTimeout(resolve, 250))
                  return cnt
                })
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url)
      await expect(page.getByTestId('button')).toHaveText('Count: 0')
      await page.getByTestId('button').click()
      await expect(page.getByTestId('button')).toHaveText('Count: 1')
    },
  )
})
