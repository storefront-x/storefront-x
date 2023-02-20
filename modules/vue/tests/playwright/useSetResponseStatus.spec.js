import { expect, test } from '@playwright/test'
import { makeProject, wrapConsole } from '@storefront-x/testing'

test('sets correct response status', async () => {
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
                    import useSetResponseStatus from '#ioc/composables/useSetResponseStatus'

                    const setResponseStatus = useSetResponseStatus()

                    setResponseStatus(404)
                  </script>
                `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await wrapConsole(async () => {
        const response = await fetch(url + '/a')
        expect(response.status).toEqual(404)
      })
    },
  )
})
