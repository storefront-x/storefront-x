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
              'Hello.vue': `
                  <template>
                    <h1>{{ title }}</h1>
                  </template>

                  <script setup lang="ts">
                  import { onMounted, ref } from 'vue'

                  const title = ref('Hello')

                  onMounted(() => {
                    title.value = 'Hello on client'
                  })
                  </script>
                `,
            },
            pages: {
              'index.vue': `
                <template>
                  <Hello />
                </template>
                <script setup lang="ts">
                import noHydrate from '#ioc/utils/hydration/noHydrate'
                //import Hello from '#ioc/components/Hello'
                const Hello = noHydrate(() => import('#ioc/components/Hello'))
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello')
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
              'Hello.vue': `
                    <template>
                      <h1>{{ title }}</h1>
                      <button id="changeText" @click="myClick">Change</button>
                    </template>
  
                    <script setup lang="ts">
                    import { onMounted, ref } from 'vue'
  
                    const title = ref('Hello')
  
                    const myClick = () => {
                        title.value = 'Hello changed'
                    }
                    </script>
                  `,
            },
            pages: {
              'index.vue': `
                  <template>
                    <Hello />
                  </template>
                  <script setup lang="ts">
                  import noHydrate from '#ioc/utils/hydration/noHydrate'
                  const Hello = noHydrate(() => import('#ioc/components/Hello'))
                  </script>
                `,
              'page1.vue': `
                  <template>
                    <h1>Page 1</h1>
                    <button @click="$router.push({path: '/'})">Click me</button>
                  </template>
                `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/page1', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Page 1')
      await page.locator('button').click()
      await page.locator('#changeText').click()
      await expect(await page.content()).toContain('Hello changed')
    },
  )
})
