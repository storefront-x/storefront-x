import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('nested directories', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            concepts: {
              'NestedConcept.js': `
                import { IocConcept } from '@storefront-x/core'

                export default class NestedConcept extends IocConcept {
                  get directory() {
                    return 'nested/concept'
                  }
                }
              `,
            },
            nested: {
              concept: {
                'test.js': `export default 'NESTED'`,
              },
            },
            server: {
              middleware: {
                'test.js': `
                  import test from '#ioc/nested/concept/test'

                  export default (req, res) => res.send(test)
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('NESTED')
    },
  )
})

test('files with space in name', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            concepts: {
              'SomeConcept.js': `
                import { IocConcept } from '@storefront-x/core'

                export default class SomeConcept extends IocConcept {
                  get directory() {
                    return 'some'
                  }
                }
              `,
            },
            some: {
              'asd qwe.js': `export default 'SOME'`,
            },
            server: {
              middleware: {
                'test.js': `
                  import asd_qwe from '#ioc/some/asd qwe'

                  export default (req, res) => res.send(asd_qwe)
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('SOME')
    },
  )
})

test('extensions', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            concepts: {
              'SomeConcept.js': `
                import { IocConcept } from '@storefront-x/core'

                export default class SomeConcept extends IocConcept {
                  get directory() {
                    return 'some'
                  }
                }
              `,
            },
            some: {
              'foo.js': `export default {}`,
              'foo.ext.js': `export default (self) => ({ ...self, bar: 'baz' })`,
            },
            server: {
              middleware: {
                'test.js': `
                  import foo from '#ioc/some/foo'

                  export default (req, res) => res.send(foo.bar)
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('baz')
    },
  )
})

test('multiple extensions', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            concepts: {
              'SomeConcept.js': `
                import { IocConcept } from '@storefront-x/core'

                export default class SomeConcept extends IocConcept {
                  get directory() {
                    return 'some'
                  }
                }
              `,
            },
            some: {
              'foo.js': `export default {}`,
            },
            server: {
              middleware: {
                'test.js': `
                  import foo from '#ioc/some/foo'

                  export default (req, res) => res.send(foo.bar + foo.baz)
                `,
              },
            },
          },
        ],
        [
          'appA',
          {
            some: {
              'foo.ext.js': `export default (self) => ({ ...self, bar: 'bar' })`,
            },
          },
        ],
        [
          'appB',
          {
            some: {
              'foo.ext.js': `export default (self) => ({ ...self, baz: 'baz' })`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('barbaz')
    },
  )
})

test('order of multiple extensions', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            concepts: {
              'SomeConcept.js': `
                import { IocConcept } from '@storefront-x/core'

                export default class SomeConcept extends IocConcept {
                  get directory() {
                    return 'some'
                  }
                }
              `,
            },
            some: {
              'foo.js': `export default {}`,
            },
            server: {
              middleware: {
                'test.js': `
                  import foo from '#ioc/some/foo'

                  export default (req, res) => res.send(foo.bar + foo.baz)
                `,
              },
            },
          },
        ],
        [
          'appA',
          {
            some: {
              'foo.ext.js': `export default (self) => ({ ...self, bar: 'bar' })`,
            },
          },
        ],
        [
          'appB',
          {
            some: {
              'foo.ext.js': `export default (self) => ({ ...self, bar: 'baz' })`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('baz')
    },
  )
})
