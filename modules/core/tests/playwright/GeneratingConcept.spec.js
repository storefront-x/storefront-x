import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('generating to single file', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            concepts: {
              'TestingConcept.js': `
                import { GeneratingConcept } from '@storefront-x/core'

                export default class TestingConcept extends GeneratingConcept {
                  get directory() {
                    return 'testFolder'
                  }
                }
              `,
            },
            testFolder: {
              'file1.js': `export default "foo"`,
              'file2.js': `export default "bar"`,
            },
            server: {
              middleware: {
                'test.js': `
                  import test from '~/.sfx/testFolder'
                  export default (req, res) => res.send(test.file1+test.file2)
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('foobar')
    },
  )
})

test('exportAll from single file', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            concepts: {
              'TestingConcept.js': `
                import { GeneratingConcept } from '@storefront-x/core'

                export default class TestingConcept extends GeneratingConcept {
                  get directory() {
                    return 'testFolder'
                  }
                  get exportAll() {
                    return true
                  }
                }
              `,
            },
            testFolder: {
              'file1.js': `export const foo1="foo1"
                            export const foo2="foo2"`,
              'file2.js': `export const bar1="bar1"
                            export const bar2="bar2"`,
            },
            server: {
              middleware: {
                'test.js': `
                  import test from '~/.sfx/testFolder'
                  const {file1:{foo1,foo2}, file2:{bar1,bar2}} = test
                  export default (req, res) => res.send(foo1+bar1+foo2+bar2)
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('foo1bar1foo2bar2')
    },
  )
})

test('generate multiple files', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            concepts: {
              'TestingConcept.js': `
                  import { GeneratingConcept } from '@storefront-x/core'

                  export default class TestingConcept extends GeneratingConcept {
                    get directory() {
                      return 'testFolder'
                    }
                    get generateMultipleFiles() {
                      return true
                    }
                  }
                `,
            },
            testFolder: {
              'file1.js': `export default "foo"`,
              'file2.js': `export default "bar"`,
            },
            server: {
              middleware: {
                'test.js': `
                    import test1 from '~/.sfx/testFolder/file1'
                    import test2 from '~/.sfx/testFolder/file2'

                    export default (req, res) => res.send(test1+test2)
                  `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('foobar')
    },
  )
})

test('exportAll from multiple files', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            concepts: {
              'TestingConcept.js': `
                import { GeneratingConcept } from '@storefront-x/core'

                export default class TestingConcept extends GeneratingConcept {
                  get directory() {
                    return 'testFolder'
                  }
                  get exportAll() {
                    return true
                  }
                  get generateMultipleFiles() {
                    return true
                  }
                }
              `,
            },
            testFolder: {
              'file1.js': `export const foo1="foo1"
                            export const foo2="foo2"`,
              'file2.js': `export const bar1="bar1"
                            export const bar2="bar2"`,
            },
            server: {
              middleware: {
                'test.js': `
                  import file1 from '~/.sfx/testFolder/file1'
                  import file2 from '~/.sfx/testFolder/file2'
                  export default (req, res) => res.send(file1.foo1+file2.bar1+file1.foo2+file2.bar2)
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('foo1bar1foo2bar2')
    },
  )
})
