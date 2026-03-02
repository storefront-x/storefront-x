import { expect, test } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('no index page', async ({ page }) => {
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
              '$layout.vue': `<template>Layout<RouterView /></template>`,
              '$404.vue': `<template>Correct text</template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Correct text')
    },
  )
})
