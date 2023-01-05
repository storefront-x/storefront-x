import { expect, test } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('basic router', async ({ page }) => {
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
              'index.vue': `<template><h1>Hello from home!</h1></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Hello from home!')
    },
  )
})

test('SSR non-index page', async ({ page }) => {
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
              'index.vue': `<template><h1>Hello from home!</h1></template>`,
              'a.vue': `<template><h1>Page A</h1></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/a', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Page A')
    },
  )
})

test('navigating between pages', async ({ page }) => {
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
              'a.vue': `<template><h1>Page A</h1></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Page index')
      await page.locator('#a').click()
      await expect(page.locator('h1')).toContainText('Page A')
    },
  )
})

test('layout', async ({ page }) => {
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
              'a.vue': `<template><h2>Page A</h2></template>`,
              '$layout.vue': `<template><h1>Layout</h1><RouterView /></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/a', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Layout')
      await expect(page.locator('h2')).toContainText('Page A')
    },
  )
})

test('404', async ({ page }) => {
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
              'index.vue': `<template><h1>Hello from home!</h1></template>`,
              '$404.vue': `<template><h1>Error page</h1><slot /></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/a', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Error page')
    },
  )
})

test('nested routes', async ({ page }) => {
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
              hello: {
                'world.vue': `<template><h1>Hello, World!</h1></template>`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/hello/world', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Hello, World!')
    },
  )
})

test('navigating to named route', async ({ page }) => {
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
              'index.vue': `<template><button @click="$router.push({name: 'a'})">Click me</button></template>`,
              'a.vue': `<template><h1>Hello, A!</h1></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.locator('button').click()
      await expect(page.locator('h1')).toContainText('Hello, A!')
    },
  )
})

test('navigating to named nested route', async ({ page }) => {
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
              'index.vue': `<template><button @click="$router.push({name: 'a/b/c'})">Click me</button></template>`,
              'a': {
                b: {
                  'c.vue': `<template><h1>Hello, C!</h1></template>`,
                },
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.locator('button').click()
      await expect(page.locator('h1')).toContainText('Hello, C!')
    },
  )
})

test('show 404 if index is missing', async ({ page }) => {
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
              '$layout.vue': `<template><header>Header</Header><RouterView /></template>`,
              '$404.vue': `<template><main>404</main></template>`,
              'test.vue': `<template><main>test</main></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('body')).toContainText('Header404')
    },
  )
})
