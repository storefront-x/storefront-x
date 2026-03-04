import { test, expect } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('concept overriding', async () => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        '@magexo/atomic-design',
        [
          'my-module',
          {
            concepts: {
              'Atoms.js': `
                import path from 'node:path'
                import { IocConcept } from '@magexo/core'

                export default class Atoms extends IocConcept {
                  get directory() {
                    return 'atoms'
                  }

                  async execute() {
                    await this.writeFile(path.join(this.dst(), 'Button.ts'), 'export default "test"')
                  }
                }
              `,
            },
            atoms: {
              'Button.vue': `
                <template>
                  <button>My Button</button>
                </template>
              `,
            },
            pages: {
              'index.vue': `
                <template>
                  <h1>{{ Button }}</h1>
                </template>
                <script setup>
                import Button from '#ioc/atoms/Button'
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await fetch(url)
      expect(await response.text()).toContain('<h1>test</h1>')
    },
  )
})
