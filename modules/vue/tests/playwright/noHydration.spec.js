import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('noHydration after ssr hydration', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            components: {
              'Counter.vue': `
                <template>
                  <h1>Count: {{ count }}</h1>
                  <button @click="count += 1"></button>
                </template>

                <script setup lang="ts">
                  import { ref } from 'vue'

                  const count = ref(0)
                </script>
              `,
            },
            pages: {
              'index.vue': `
                <template>
                  <Counter />
                </template>
                <script setup lang="ts">
                  import noHydrate from '#ioc/utils/hydration/noHydrate'
                  const Counter = noHydrate(() => import('#ioc/components/Counter'))
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Count: 0')
      await page.locator('button').click()
      await expect(page.locator('h1')).toContainText('Count: 0')
    },
  )
})

test('noHydration after router navigation', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            components: {
              'Counter.vue': `
                <template>
                  <h1>Count: {{ count }}</h1>
                  <button @click="count += 1"></button>
                </template>

                <script setup lang="ts">
                  import { ref } from 'vue'

                  const count = ref(0)
                </script>
              `,
            },
            pages: {
              'index.vue': `
                <template>
                  <Counter />
                </template>
                <script setup lang="ts">
                  import noHydrate from '#ioc/utils/hydration/noHydrate'
                  const Counter = noHydrate(() => import('#ioc/components/Counter'))
                </script>
              `,
              'entry.vue': `
                <template>
                  <div />
                </template>
                <script>
                export default {
                  mounted() {
                    this.$router.push('/')
                  }
                }
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/entry', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Count: 0')
      await page.locator('button').click()
      await expect(page.locator('h1')).toContainText('Count: 1')
    },
  )
})
