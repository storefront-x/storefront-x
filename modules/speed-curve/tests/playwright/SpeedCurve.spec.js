import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('SpeedCurve script and correct ID in head', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/speed-curve',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>Heading</h1>
                </template>
              `,
            },
            config: {
              'speed-curve': {
                'SPEEDCURVE_ID.ts': `export default 'TESTER'`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      expect(await page.content()).toContain(
        '<script src="https://cdn.speedcurve.com/js/lux.js?id=TESTER" defer="" crossorigin="anonymous"></script>',
      )
    },
  )
})

test('SpeedCurve labeling on page mounted', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/base-commerce',
        '@storefront-x/speed-curve',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>Homepage</h1>
                </template>
                <script setup>
                import { onMounted } from 'vue'
                import useEmitPageViewLabel from '#ioc/bus/emitters/useEmitPageViewLabel'

                const emitPageViewLabel = useEmitPageViewLabel()

                onMounted(() => {
                  emitPageViewLabel("home-page")
                })
                </script>
              `,
            },
            config: {
              'speed-curve': {
                'SPEEDCURVE_ID.ts': `export default 'TESTER'`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      const luxLabel = await page.evaluate(() => window.LUX.label)
      expect(luxLabel).toEqual('home-page')
    },
  )
})
