import { test, expect } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('global styles are rendered before components styles', async ({ page }) => {
  await buildProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        [
          'my-module',
          {
            global: {
              styles: {
                'global.css': 'body { background-color: red }',
              },
            },
            pages: {
              'my-page.vue': `
                <template>
                <h1>MyComponent</h1>
                </template>
                <style scoped>
                  h1 { color: blue }
                </style>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/my-page')
      expect(await response.text()).toMatch(
        /<style>body{background-color:red}<\/style>.*?<link rel="stylesheet" href="\/assets/s,
      )
    },
  )
})
