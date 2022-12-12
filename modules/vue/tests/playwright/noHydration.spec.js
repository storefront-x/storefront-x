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
                    <h1>Hello</h1>
                    <div v-if="more" class="more">More</div>
                  </template>

                  <script setup lang="ts">
                  import { onMounted, ref } from 'vue'

                  const more = ref(false)

                  onMounted(() => {
                    more.value = true
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
      await expect(await page.locator('div.more')).toHaveCount(0)
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
      await expect(await page.locator('h1')).toContainText('Page 1')
      await page.locator('button').click()
      await page.locator('#changeText').click()
      await expect(await page.locator('h1')).toContainText('Hello changed')
    },
  )
})
