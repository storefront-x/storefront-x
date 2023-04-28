import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('transfer of state', async ({ page }) => {
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
                  <h1>{{ data }}</h1>
                </template>
                <script setup>
                import useAsyncData from '#ioc/composables/useAsyncData'

                const { data } = await useAsyncData('asyncData', async () => 'async data')
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('<h1>async data</h1>')
      await expect(page.locator('h1')).toContainText('async data')
    },
  )
})

test('navigation to page with async data', async ({ page }) => {
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
                  <RouterLink to="/async">link</RouterLink>
                </template>
              `,
              'async.vue': `
                <template>
                  <h1>{{ value }}</h1>
                </template>
                <script setup>
                import { computed } from 'vue'
                import useAsyncData from '#ioc/composables/useAsyncData'

                const { data } = await useAsyncData('asyncData',
                  () => new Promise(
                    (resolve) => setTimeout(
                      () => resolve({ a: { b: 'async data' }})
                    )
                  )
                )

                const value = computed(() => data.value.a.b)
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.locator('a').click()
      await expect(page.locator('h1')).toContainText('async data')
    },
  )
})

test('refetch async data', async ({ page }) => {
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
                  <RouterLink to="/category/a">link</RouterLink>
                </template>
              `,
              'category': {
                '[slug].vue': `
                  <template>
                    <h1>{{ data.slug }}</h1>
                    <RouterLink to="/category/b">link</RouterLink>
                  </template>
                  <script setup>
                  import { computed } from 'vue'
                  import useAsyncData from '#ioc/composables/useAsyncData'
                  import useRoute from '#ioc/composables/useRoute'

                  const route = useRoute()

                  const { data } = await useAsyncData('category', () => fetch('/data/' + route.params.slug).then(r => r.json()))
                  </script>
                `,
              },
            },
            server: {
              middleware: {
                'data.js': `
                  import { eventHandler, getRequestURL } from 'h3'
                  let count = 0

                  export default eventHandler((event) => {
                    const pathName = getRequestURL(event).pathname
                    if (!pathName.startsWith('/data/')) return

                    return { slug: pathName.replace('/data/', '') }
                  })
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.locator('a').click()
      await expect(page.locator('h1')).toContainText('a')
      await page.locator('a').click()
      await expect(page.locator('h1')).toContainText('b')
    },
  )
})
