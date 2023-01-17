import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('basic public file', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        [
          'my-module',
          {
            public: {
              'hello.txt': `Hello, public file!`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/hello.txt', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, public file!')
    },
  )
})

test('basic public file in nested directory', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        [
          'my-module',
          {
            public: {
              a: {
                b: {
                  'hello.txt': `Hello, public file!`,
                },
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/a/b/hello.txt', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, public file!')
    },
  )
})

test('removing files works with HMR', async ({ page }) => {
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
              '$404.vue': `<template><h1>404</h1></template>`,
            },
            public: {
              'robots.txt': `robots`,
            },
          },
        ],
      ],
    },
    async ({ url, rm }) => {
      await rm('my-module/public/robots.txt')
      await page.goto(url + '/robots.txt', { waitUntil: 'networkidle' })
      expect(await page.content()).toContain('404')
    },
  )
})

test('writing into public directory does not remove other files', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            public: {
              'a.txt': `a`,
              'b': {
                c: {
                  'd.txt': 'ddd',
                },
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      await writeFile('my-module/public/a.txt', 'A')
      await page.goto(url + '/b/c/d.txt', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('ddd')
    },
  )
})
