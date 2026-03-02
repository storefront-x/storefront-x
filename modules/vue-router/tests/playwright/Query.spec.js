import { expect, test } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('query stays after reload', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        [
          'my-module',
          {
            pages: {
              'hello.vue': `<template><h1>Hello, {{ $route.query.name }}!</h1></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/hello?name=Query', { waitUntil: 'networkidle' })
      await page.reload()
      await expect(page.locator('h1')).toContainText('Hello, Query!')
    },
  )
})
