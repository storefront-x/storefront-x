import { expect, test } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('SSR - basic router', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/solid',
        '@storefront-x/solid-router',
        [
          'my-module',
          {
            pages: {
              'index.jsx': `
                export default () => <h1>Hello from home!</h1>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello from home!')
    },
  )
})

test('SSR - non index page', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/solid',
        '@storefront-x/solid-router',
        [
          'my-module',
          {
            pages: {
              'index.jsx': `
                export default () => <h1>index page</h1>
              `,
              'test.jsx': `
                export default () => <h1>test page</h1>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/test', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('test page')
    },
  )
})

test('SSR - parameters', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/solid',
        '@storefront-x/solid-router',
        [
          'my-module',
          {
            pages: {
              'index.jsx': `
                export default () => <h1>index page</h1>
              `,
              'user': {
                '[name].jsx': `
                  import useParams from '#ioc/solid/router/useParams'

                  export default () => {
                    const params = useParams()

                    return <h1>{\`user \${params.name}\`}</h1>
                  }
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/user/test', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('user test')
    },
  )
})

test('client navigation', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/solid',
        '@storefront-x/solid-router',
        [
          'my-module',
          {
            pages: {
              'index.jsx': `
                import A from '#ioc/components/A'

                export default () => {
                  return <A href="/test">test</A>
                }
              `,
              'test.jsx': `
                export default () => {
                  return <h1>test page</h1>
                }
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/', { waitUntil: 'networkidle' })
      await page.locator('a').click()
      await expect(page.locator('h1')).toContainText('test page')
    },
  )
})
