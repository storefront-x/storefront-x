import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('serverInit action', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-pinia',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <button>{{ mainStore.count }}</button>
                </template>
                <script setup>
                import useMainStore from '#ioc/stores/useMainStore'

                const mainStore = useMainStore()
                </script>
              `,
            },
            stores: {
              'useMainStore.ts': `
                import { defineStore } from 'pinia'
                export default defineStore('main', {
                  state: () => ({
                    count: 0,
                  }),
                  actions: {
                    serverInit: () => {
                      return {
                        count: 1
                      }
                    }
                  }
                })
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('button')).toContainText('1')
    },
  )
})

test('async serverInit action', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-pinia',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <button>{{ mainStore.count }}</button>
                </template>
                <script setup>
                import useMainStore from '#ioc/stores/useMainStore'

                const mainStore = useMainStore()
                </script>
              `,
            },
            stores: {
              'useMainStore.ts': `
                import { defineStore } from 'pinia'
                export default defineStore('main', {
                  state: () => ({
                    count: 0,
                  }),
                  actions: {
                    serverInit: async () => {
                      return {
                        count: 1
                      }
                    }
                  }
                })
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('button')).toContainText('1')
    },
  )
})
