import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('server-side global state management', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-pinia',
        [
          'app',
          {
            pages: {
              'index.vue': `
                <template>
                  <button>{{ mainStore.count }}</button>
                </template>
                <script setup>
                import IS_SERVER from '#ioc/config/IS_SERVER'
                import useMainStore from '#ioc/stores/useMainStore'

                const mainStore = useMainStore()

                if (IS_SERVER) {
                  mainStore.increment()
                }
                </script>
              `,
            },
            stores: {
              'useMainStore.js': `
                import { defineStore } from 'pinia'
                export default defineStore('main', {
                  state: () => ({
                    count: 0,
                  }),
                  actions: {
                    increment() {
                      this.count++
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
      await expect(await page.content()).toContain('<button>1</button>')
    },
  )
})

test('transfer state', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-pinia',
        [
          'app',
          {
            pages: {
              'index.vue': `
                <template>
                  <button>{{ mainStore.count }}</button>
                </template>
                <script setup>
                import IS_SERVER from '#ioc/config/IS_SERVER'
                import useMainStore from '#ioc/stores/useMainStore'

                const mainStore = useMainStore()

                if (IS_SERVER) {
                  mainStore.increment()
                }
                </script>
              `,
            },
            stores: {
              'useMainStore.js': `
                import { defineStore } from 'pinia'
                export default defineStore('main', {
                  state: () => ({
                    count: 0,
                  }),
                  actions: {
                    increment(count) {
                      this.count++
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
