import { expect, test } from '@playwright/test'
import { makeProject, wrapConsole } from '@storefront-x/testing'

test('redirect is working', async ({ page }) => {
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
              'a.vue': `<template><h1>A</h1></template>
                <script setup lang="ts">
                    import redirect from '#ioc/utils/redirect'
                    redirect('/b', 301)
                </script>
              `,
              'b.vue': `<template><h1>B</h1></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await wrapConsole(async () => {
        await page.goto(url + '/a', { waitUntil: 'networkidle' })
        await expect(page.locator('h1')).toContainText('B')
      })
    },
  )
})

test('redirect results in proper redirect code', async () => {
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
              'a.vue': `<template><h1>A</h1></template>
                  <script setup lang="ts">
                      import redirect from '#ioc/utils/redirect'
                      redirect('/b')
                  </script>
                `,
              'b.vue': `<template><h1>B</h1></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await wrapConsole(async () => {
        const response = await fetch(url + '/a', { redirect: 'manual' })
        expect(response.status).toEqual(302)
      })
    },
  )
})

test('redirect works on client', async ({ page }) => {
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
              'a.vue': `<template>
                            <a href="/b">
                                <h1>LINK</h1>
                            </a>
                        </template>
                        `,
              'b.vue': `<template><h1>B</h1></template>
                    <script setup lang="ts">
                        import redirect from '#ioc/utils/redirect'
                        redirect('/c')
                    </script>
                  `,
              'c.vue': `<template><h1>C</h1></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await wrapConsole(async () => {
        await page.goto(url + '/a', { waitUntil: 'networkidle' })
        await page.locator('a').click()
        await expect(page.locator('h1')).toContainText('C')
      })
    },
  )
})
