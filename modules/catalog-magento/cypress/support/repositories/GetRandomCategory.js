import randomFrom from '#ioc/utils/array/randomFrom'
import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import CategoriesWithProductTypes from '#ioc/graphql/queries/CategoriesWithProductTypes'
import MAGENTO_GRAPHQL_ENDPOINT from '#ioc/config/MAGENTO_GRAPHQL_ENDPOINT'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'

const query = CategoriesWithProductTypes()
  .with({
    id: '2',
  })
  .toString()

const body = JSON.stringify({
  query,
  variables: {
    id: '2',
  },
})

export default ({ minProducts = 1, productType = 'SimpleProduct' } = {}) =>
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
    .then(({ body }) => {
      const categories = body.data.categories.items.filter((category) => {
        return (
          category.products.total_count >= minProducts &&
          category.products.items.some((item) => item.__typename === productType)
        )
      })

      const category = randomFrom(categories)

      Cypress.log({
        name: 'GetRandomCategory',
        displayName: 'grc',
        message: category.name,
      })

      return category
    })
