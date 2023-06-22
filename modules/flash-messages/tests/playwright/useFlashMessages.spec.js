import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('flash message is working', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/flash-messages',
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
                import useFlashMessages from '#ioc/composables/useFlashMessages'
                import { ref, onMounted } from 'vue'

                const flashMessages = useFlashMessages()

                if (IS_SERVER) {
                  flashMessages.add('hello-from-server')
                }

                const hello = ref('')

                onMounted(() => {
                  const messages = flashMessages.get()
                  hello.value = messages[0]
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
      await expect(page.locator('h1')).toContainText('hello-from-server')
    },
  )
})

test('setting multiple flash messages is working', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/flash-messages',
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
                import useFlashMessages from '#ioc/composables/useFlashMessages'
                import { ref, onMounted } from 'vue'

                const flashMessages = useFlashMessages()

                if (IS_SERVER) {
                  flashMessages.add('hello-from-server')
                  flashMessages.add('hello-from-second-message')
                }

                const hello = ref('')

                onMounted(() => {
                  const messages = flashMessages.get()
                  hello.value = messages[1]
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
      await expect(page.locator('h1')).toContainText('hello-from-second-message')
    },
  )
})

test('flash messages are removed after you get them', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/flash-messages',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>{{ hello }}</h1>
                  <button @click="getMessages"></button>
                  <h2>{{ hasMessages }}</h2>
                </template>
                <script setup>
                import IS_SERVER from '#ioc/config/IS_SERVER'
                import useFlashMessages from '#ioc/composables/useFlashMessages'
                import { ref, onMounted } from 'vue'

                const flashMessages = useFlashMessages()

                if (IS_SERVER) {
                  flashMessages.add('hello-from-server')
                }

                const hello = ref('')
                const hasMessages = ref(true)

                onMounted(() => {
                  const messages = flashMessages.get()
                  hello.value = messages[0]
                })

                function getMessages() {
                  const messages = flashMessages.get()
                  hasMessages.value = messages.length > 0
                }

                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('hello-from-server')
      await page.locator('button').click()
      await expect(page.locator('h2')).toContainText('false')
    },
  )
})
