import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('SpeedCurve script and correct ID in head', async ({ page }) => {
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

test.skip('SpeedCurve labeling on page mounted', async ({ page }) => {
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
                import useEmitPageViewHomepage from '#ioc/bus/emitters/useEmitPageViewHomepage'

                const emitPageViewHomepage = useEmitPageViewHomepage()

                onMounted(() => {
                  emitPageViewHomepage()
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

test.skip('speedCurve sends beacon with correct label after navigation', async ({ page }) => {
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
                  <h1>Page index</h1>
                  <RouterLink id='a' to='/a'>A</RouterLink>
                </template>
                <script setup>
                import { onMounted } from 'vue'
                import useEmitPageViewHomepage from '#ioc/bus/emitters/useEmitPageViewHomepage'

                const emitPageViewHomepage = useEmitPageViewHomepage()

                onMounted(() => {
                  emitPageViewHomepage()
                })
                </script>
              `,
              'a.vue': `<template><h1>Page A</h1></template>`,
            },
            config: {
              'speed-curve': {
                'SPEEDCURVE_ID.ts': `export default '4410689865'`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      const beaconUrl = await page.evaluate(() => window.LUX.beaconUrl)
      let luxLabelInBeacon
      page.on('request', (request) => {
        if (request.url().includes(beaconUrl)) {
          const params = new URLSearchParams(request.url())
          luxLabelInBeacon = params.get('l')
        }
      })
      await page.locator('#a').click()

      expect(luxLabelInBeacon).toEqual('home-page')
    },
  )
})

test.skip('speedCurve sends beacon with correct custom metrics after navigation', async ({ page }) => {
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
                  <h1>Page index</h1>
                  <RouterLink id='a' to='/a'>A</RouterLink>
                </template>
                <script setup>
                import { onMounted } from 'vue'
                import useAddSpeedCurveCustomMetrics from '#ioc/composables/useAddSpeedCurveCustomMetrics'

                const addSpeedCurveCustomMetrics = useAddSpeedCurveCustomMetrics()

                onMounted(() => {
                  addSpeedCurveCustomMetrics("test-metric", 123)
                })
                </script>
              `,
              'a.vue': `<template><h1>Page A</h1></template>`,
            },
            config: {
              'speed-curve': {
                'SPEEDCURVE_ID.ts': `export default '4410689865'`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      const beaconUrl = await page.evaluate(() => window.LUX.beaconUrl)
      let luxCustomMetricInBeacon
      page.on('request', (request) => {
        if (request.url().includes(beaconUrl)) {
          const params = new URLSearchParams(request.url())
          luxCustomMetricInBeacon = params.get('CD')
        }
      })
      await page.locator('#a').click()

      expect(luxCustomMetricInBeacon).toEqual('test-metric|123')
    },
  )
})
