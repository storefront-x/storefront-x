import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('cms block', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/shopware',
        [
          'app',
          {
            pages: {
              'index.vue': `
                    <template>
                        <SfxShopwareCmsPage :data="data" />
                    </template>
                    <script setup>
                        import { ref } from 'vue'
                        import SfxShopwareCmsPage from '#ioc/components/SfxShopwareCmsPage'
                        const data = ref({
                            sections: [
                                {
                                    blocks: [
                                        {
                                            'type': 'text-block',
                                            'slots': [
                                                {
                                                    'type': 'text-block',
                                                    'slot': 'default',
                                                    'data': {
                                                        'content': '<h1>Hello, World!</h1>',
                                                    }
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        })
                    </script>
                    `,
            },
            shopware: {
              cms: {
                blocks: {
                  'text-block.vue': `
                              <template>
                                  <slot name="default" />
                                  <div v-html="data.data?.content ?? ''"></div>
                              </template>
                              <script setup>
                                  const props = defineProps({
                                    data: {
                                        type: Object,
                                        default: () => ({}),
                                      },
                                  })
                              </script>
                              `,
                },
              },
            },
            config: {
              'SHOPWARE_URL.ts': `export default 'https://shopware.url'`,
              'SHOPWARE_ACCESS_KEY.ts': `export default 'xxx'`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, World!')
    },
  )
})

test('cms block with slots', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/shopware',
        [
          'app',
          {
            pages: {
              'index.vue': `
                      <template>
                          <SfxShopwareCmsPage :data="data" />
                      </template>
                      <script setup>
                          import { ref } from 'vue'
                          import SfxShopwareCmsPage from '#ioc/components/SfxShopwareCmsPage'
                          const data = ref({
                              sections: [
                                  {
                                      blocks: [
                                          {
                                              'type': 'two-column-block',
                                              'slots': [
                                                  {
                                                      'type': 'text',
                                                      'slot': 'left',
                                                      'data': {
                                                          'content': '<h1>Hello, Left World!</h1>',
                                                      }
                                                  },
                                                  {
                                                    'type': 'text',
                                                    'slot': 'right',
                                                    'data': {
                                                        'content': '<h1>Hello, Right World!</h1>',
                                                    }
                                                },
                                              ]
                                          },
                                      ]
                                  },
                              ]
                          })
                      </script>
                      `,
            },
            shopware: {
              cms: {
                blocks: {
                  'two-column-block.vue': `
                        <template>
                            <div>
                                <slot name="left" />
                                <slot name="right" />
                            </div>
                        </template>
                        <script setup>
                            const props = defineProps({
                            data: {
                                type: Object,
                                default: () => ({}),
                                },
                            })
                        </script>
                        <style scoped>
                            div {
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                            }
                        </style>
                        `,
                  'text.vue': `
                        <template>
                            <div v-html="data.data?.content ?? ''"></div>
                        </template>
                        <script setup>
                            const props = defineProps({
                            data: {
                                type: Object,
                                default: () => ({}),
                                },
                            })
                        </script>
                        `,
                },
              },
            },
            config: {
              'SHOPWARE_URL.ts': `export default 'https://shopware.url'`,
              'SHOPWARE_ACCESS_KEY.ts': `export default 'xxx'`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, Left World!')
      await expect(await page.content()).toContain('Hello, Right World!')
    },
  )
})
