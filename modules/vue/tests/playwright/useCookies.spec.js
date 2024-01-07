import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('setting of cookies on the server side', async ({ page }) => {
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
                  <h1>{{ hello }}</h1>
                </template>
                <script setup>
                import IS_SERVER from '#ioc/config/IS_SERVER'
                import useCookies from '#ioc/composables/useCookies'
                import { ref, onMounted } from 'vue'

                const cookies = useCookies()

                if (IS_SERVER) {
                  cookies.set('hello', 'world')
                }

                const hello = ref('')

                onMounted(() => {
                  hello.value = cookies.get('hello')
                })
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('world')
    },
  )
})

test('cookies are shared on the server side', async ({ page }) => {
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
                  <h1>{{ cookies2.get('foo') }}</h1>
                </template>
                <script setup>
                import IS_SERVER from '#ioc/config/IS_SERVER'
                import useCookies from '#ioc/composables/useCookies'
                import { ref, onMounted } from 'vue'

                const cookies1 = useCookies()
                const cookies2 = useCookies()

                if (IS_SERVER) {
                  cookies1.set('foo', 'bar')
                }
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url)
      expect(await response.text()).toContain('<h1>bar</h1>')
    },
  )
})
