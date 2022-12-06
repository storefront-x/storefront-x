import { expect, test } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('is same simple path', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router-simple',
        [
          'my-module',
          {
            pages: {
              user: {
                'test.vue': `<template><RouterLink v-slot="{ isExactActive }" to="/user/test"><h1>{{isExactActive ? 'success':'fail'}}</h1></RouterLink></template>`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/user/test', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('success')
    },
  )
})

test('is same path with query', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router-simple',
        [
          'my-module',
          {
            pages: {
              user: {
                'test.vue': `<template><RouterLink v-slot="{ isExactActive }" to="/user/test?working=true"><h1>{{isExactActive ? 'success':'fail'}}</h1></RouterLink></template>`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/user/test?working=true', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('success')
    },
  )
})

// TEST-TODO fix this on MAC Linux, its working on Windows
test.skip('is same path with params', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router-simple',
        [
          'my-module',
          {
            pages: {
              user: {
                'test.vue': `
                  <template>
                    <button @click="$router.push({name:'user/[name]', params:{name:'tester'}})">
                      Click me
                    </button>
                  </template>
                `,
                '[name].vue': `
                  <template>
                    <RouterLink v-slot="{ isExactActive }" :to="{ name: 'user/[name]', params: { name: 'tester' }}">
                      <h1>{{ isExactActive ? 'success' : 'fail' }}</h1>
                    </RouterLink>
                  </template>
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/user/test', { waitUntil: 'networkidle' })
      await page.evaluate(() => new Promise(requestAnimationFrame))
      await page.locator('button').click()
      await expect(page.locator('h1')).toContainText('success')
    },
  )
})