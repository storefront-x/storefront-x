import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('shared state test', async ({ page, context }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-pinia',
        '@storefront-x/vue-pinia-shared-state',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <button @click="updateStoreCount">{{ mainStore.count }}</button>
                </template>
                <script setup>
                import useMainStore from '#ioc/stores/useMainStore'

                const mainStore = useMainStore()

                const updateStoreCount = ()=> {
                  mainStore.count++
                }
                </script>
              `,
            },
            stores: {
              'useMainStore.ts': `
                import defineStore from '#ioc/utils/vuePinia/defineStore'
                export default defineStore('main', {
                  state: () => ({
                    count: 0,
                  }),
                })
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })

      const newTab = await context.newPage()
      await newTab.goto(url, { waitUntil: 'networkidle' })

      await page.locator('button').click()
      await expect(page.locator('button')).toContainText('1')
      await page.locator('button').click()
      await expect(newTab.locator('button')).toContainText('2')
    },
  )
})
