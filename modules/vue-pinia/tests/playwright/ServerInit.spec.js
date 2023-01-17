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
                import defineStore from '#ioc/utils/vuePinia/defineStore'
                export default defineStore('main', {
                  state: () => ({
                    count: 0,
                  }),
                })
              `,
              'useMainStore.serverInit.ts': `
                import useMainStore from '#ioc/stores/useMainStore'
                export default () => {
                  const mainStore = useMainStore()

                  return () => {
                    mainStore.$patch({ count: 1 })
                  }
                }
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url)
      expect(await page.content()).toContain('<button>1</button>')
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
                import defineStore from '#ioc/utils/vuePinia/defineStore'
                export default defineStore('main', {
                  state: () => ({
                    count: 0,
                  }),
                })
              `,
              'useMainStore.serverInit.ts': `
                import useMainStore from '#ioc/stores/useMainStore'
                export default () => {
                  const mainStore = useMainStore()

                  return async () => {
                    await new Promise((resolve) => setTimeout(resolve, 100))

                    mainStore.$patch({ count: 1 })
                  }
                }
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url)
      expect(await page.content()).toContain('<button>1</button>')
      await expect(page.locator('button')).toContainText('1')
    },
  )
})
