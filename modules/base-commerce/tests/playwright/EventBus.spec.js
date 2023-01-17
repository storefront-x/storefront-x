import { expect, test } from '@playwright/test'
import { makeProject, wrapConsole } from '@storefront-x/testing'

test('event bus is working', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router-simple',
        '@storefront-x/vue-pinia',
        '@storefront-x/base-commerce',
        [
          'my-module-1',
          {
            bus: {
              events: {
                'TestEvent1.ts': `
                  export default interface TestEvent1 {
                    data: string
                  }
                `,
              },
              listeners: {
                'useListenTestEvent1.ts': `
                  import TestEvent1 from '#ioc/bus/events/TestEvent1'
                  import useEventBusStore from '#ioc/stores/useEventBusStore'

                  export default () => {
                    const eventBusStore = useEventBusStore()

                    return ({ data }: TestEvent1) => {
                      eventBusStore.count += 1
                    }
                  }
                `,
              },
            },
            pages: {
              'index.vue': `
                <template>
                  <p id="evResTest">{{ eventBusStore.count }}</p>
                </template>
                <script setup>
                  import useEventBusStore from '#ioc/stores/useEventBusStore'
                  import useEmitTestEvent1 from '#ioc/bus/emitters/useEmitTestEvent1'

                  const eventBusStore = useEventBusStore()
                  const emitTestEvent1 = useEmitTestEvent1()

                  eventBusStore.count = 0

                  emitTestEvent1({ data: '' })
                </script>
              `,
            },
            config: {
              'MAGENTO_URL.ts': `export default '/'`,
              'VUE_I18N_LOCALES.ts': `
                export default [
                  {
                    name: 'en',
                    locale: 'en-US',
                    prefix: '/',
                  }
                ]
              `,
            },
            stores: {
              'useEventBusStore.ts': `
                import { defineStore } from 'pinia'
                export default defineStore('eventBusStore', {
                  state: () => ({
                    count: 0
                  })
                });
              `,
            },
          },
        ],
        [
          'my-module-2',
          {
            bus: {
              listeners: {
                'useListenTestEvent1.ts': `
                  import TestEvent1 from '#ioc/bus/events/TestEvent1'
                  import useEventBusStore from '#ioc/stores/useEventBusStore'

                  export default () => {
                    const eventBusStore = useEventBusStore()

                    return ({ data }: TestEvent1) => {
                      eventBusStore.count += 2
                    }
                  }
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await wrapConsole(async () => {
        await page.goto(url, { waitUntil: 'networkidle' })
        await expect(page.locator('#evResTest')).toContainText('3')
      })
    },
  )
})
