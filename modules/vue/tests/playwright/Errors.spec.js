import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('handle syntax error', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            base: {
              templates: {
                'App.vue': `
                  <template>
                    <div Wrong format</div
                  </template>
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Attribute name cannot contain')
    },
  )
})

test('handle syntax error after click', async ({ page }) => {
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
              'index.vue': `<template><h1>Page index</h1><RouterLink id='a' to='/a'>A</RouterLink></template>`,
              'a.vue': `<template><h1>Page A</h1</template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Page index')
      await page.locator('#a').click()
      await expect(page.locator('.message-body')).toContainText('Invalid end tag.')
    },
  )
})
