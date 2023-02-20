import { test, expect } from '@playwright/test'
import { makeProject, wrapConsole } from '@storefront-x/testing'

test('handleRequest to catch error and return status 500', async () => {
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
                        <h1>A</h1>
                    </template>
                    <script setup lang="ts">
                        throw new Error('test error')
                    </script>
                  `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await wrapConsole(async () => {
        const response = await fetch(url, { redirect: 'manual' })
        expect(response.status).toEqual(500)
        expect(await response.text()).toContain('test error') // in dev mode, error message is displayed in the error page
      })
    },
  )
})
