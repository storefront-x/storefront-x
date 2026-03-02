import { test, expect } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('import of stores over ioc', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        '@magexo/vue-pinia',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <button @click="mainStore.increment">{{ mainStore.count }}</button>
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
      await page.locator('button').click()
      await expect(page.locator('button')).toContainText('1')
    },
  )
})

test('overriding of stores over ioc', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        '@magexo/vue-pinia',
        [
          'app-1',
          {
            pages: {
              'index.vue': `
                <template>
                  <button @click="mainStore.increment">{{ mainStore.count }}</button>
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
        [
          'app-2',
          {
            stores: {
              'useMainStore.ts': `
                import defineStore from '#ioc/utils/vuePinia/defineStore'
                export default defineStore('main', {
                  state: () => ({
                    count: 0,
                  }),
                  actions: {
                    increment() {
                      this.count += 2
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
      await page.locator('button').click()
      await expect(page.locator('button')).toContainText('2')
    },
  )
})
