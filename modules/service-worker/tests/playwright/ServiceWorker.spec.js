import { test, expect } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('service worker allows setting runtime cache', async ({ page }) => {
  await buildProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        '@magexo/service-worker',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
            serviceWorker: {
              runtimeCache: {
                '_test.js': `
                  export default {
                    urlPattern: /\\/_test\\//,
                    handler: 'NetworkFirst',
                  }
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/sw.js')
      expect(await response.text()).toContain('registerRoute(/\\/_test\\//,new e.NetworkFirst,"GET")')
    },
  )
})
