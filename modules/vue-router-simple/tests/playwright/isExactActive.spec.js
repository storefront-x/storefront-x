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

test('is same path with params', async ({ page }) => {
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
      await page.goto(url + '/user/tester', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('success')
    },
  )
})

test('exactActiveClass and exactInactiveClass', async ({ page }) => {
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
                    <RouterLink
                      v-slot="{ isExactActive }" to="/user/test?working=true"
                      exact-active-class="activeClass"
                      exact-inactive-class="inactiveClass"
                    >
                      <h1>LINK</h1>
                    </RouterLink>
                  </template>`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/user/test?working=true', { waitUntil: 'networkidle' })
      await expect(page.locator('a')).toHaveClass('activeClass')
      await expect(page.locator('a')).not.toHaveClass('inactiveClass')
      await page.goto(url + '/user/test', { waitUntil: 'networkidle' })
      await expect(page.locator('a')).toHaveClass('inactiveClass')
      await expect(page.locator('a')).not.toHaveClass('activeClass')
    },
  )
})
