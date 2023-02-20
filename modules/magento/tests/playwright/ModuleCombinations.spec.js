import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test('minimal stack', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/vue-i18n',
      '@storefront-x/vue-pinia',
      '@storefront-x/base-commerce',
      '@storefront-x/graphql',
      '@storefront-x/magento',
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
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/vue-router',
      '@storefront-x/vue-head',
      '@storefront-x/vue-i18n',
      '@storefront-x/vue-pinia',
      '@storefront-x/base-commerce',
      '@storefront-x/graphql',
      '@storefront-x/magento',
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
