import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import Products from '#ioc/graphql/queries/Products'
import MAGENTO_GRAPHQL_ENDPOINT from '#ioc/config/MAGENTO_GRAPHQL_ENDPOINT'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'

const query = Products()
  .with({
    search: '',
    filter: [],
    pageSize: 100,
    currentPage: 1,
  })
  .toString()

const body = JSON.stringify({
  query,
  variables: {
    search: '',
    filter: [],
    pageSize: 100,
    currentPage: 1,
  },
})

export default () =>
  cy
    .request({
      method: 'POST',
      url: MAGENTO_URL + MAGENTO_GRAPHQL_ENDPOINT,
      headers: {
        'Content-Type': 'application/json',
        'Store': VUE_I18N_LOCALES[0].magentoStore,
      },
      body,
    })
    .then(({ body: { data } }) => {
      const products = data.products.items

      Cypress.log({
        name: 'GetProducts',
        displayName: 'grsp',
        message: products.length,
      })

      return products
    })
