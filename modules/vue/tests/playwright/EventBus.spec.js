import { expect, test } from '@playwright/test'
import { makeProject, wrapConsole } from '@storefront-x/testing'

test('event bus with single listener', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-pinia',
        '@storefront-x/base-commerce',
        [
          'my-module-1',
          {
            bus: {
              events: {
                'TestEvent1.ts': `
                  export default interface TestEvent1 {
                    data: number
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
                      eventBusStore.count += data
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

                  emitTestEvent1({ data: 3 })
                </script>
              `,
            },
            stores: {
              'useEventBusStore.ts': `
                import defineStore from '#ioc/utils/vuePinia/defineStore'
                export default defineStore('eventBusStore', {
                  state: () => ({
                    count: 0
                  })
                });
              `,
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

test('event bus with multiple listeners', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-pinia',
        '@storefront-x/base-commerce',
        [
          'my-module-1',
          {
            bus: {
              events: {
                'TestEvent1.ts': `
                  export default interface TestEvent1 {
                    data: number
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
                      eventBusStore.count += data
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

                  emitTestEvent1({ data: 3 })
                </script>
              `,
            },
            stores: {
              'useEventBusStore.ts': `
                import defineStore from '#ioc/utils/vuePinia/defineStore'
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
                      eventBusStore.count += data * 2
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
        await expect(page.locator('#evResTest')).toContainText('9')
      })
    },
  )
})

test('event bus without listeners', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/base-commerce',
        [
          'my-module',
          {
            bus: {
              events: {
                'TestEvent.ts': `
                  export default interface TestEvent {
                    data: number
                  }
                `,
              },
            },
            pages: {
              'index.vue': `
                <template>
                  <p id="evResTest">{{ text }}</p>
                </template>
                <script setup>
                  import useEmitTestEvent from '#ioc/bus/emitters/useEmitTestEvent'
                  import { ref } from 'vue'

                  const emitTestEvent = useEmitTestEvent()
                  const text = ref('')

                  emitTestEvent({ data: 1 })
                  text.value = 'It works!'
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await wrapConsole(async () => {
        await page.goto(url, { waitUntil: 'networkidle' })
        await expect(page.locator('#evResTest')).toContainText('It works!')
      })
    },
  )
})
