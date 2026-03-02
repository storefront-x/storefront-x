import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('minimal stack', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/vue-i18n',
      '@magexo/vue-pinia',
      '@magexo/base-commerce',
      '@magexo/graphql',
      '@magexo/magento',
      [
        'my-module',
        {
          config: {
            'MAGENTO_URL.ts': `export default 'http://sample.org'`,
            'VUE_I18N_LOCALES.ts': `export default []`,
          },
        },
      ],
    ],
  })
})

test('with full vue stack', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/vue-router',
      '@magexo/vue-head',
      '@magexo/vue-i18n',
      '@magexo/vue-pinia',
      '@magexo/base-commerce',
      '@magexo/graphql',
      '@magexo/magento',
      [
        'my-module',
        {
          config: {
            'MAGENTO_URL.ts': `export default 'http://sample.org'`,
            'VUE_I18N_LOCALES.ts': `export default []`,
          },
        },
      ],
    ],
  })
})
