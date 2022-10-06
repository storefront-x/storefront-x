import randomFrom from '#ioc/utils/array/randomFrom'
import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import BlogCategories from '#ioc/graphql/queries/BlogCategories'
import MAGENTO_GRAPHQL_ENDPOINT from '#ioc/config/MAGENTO_GRAPHQL_ENDPOINT'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'

const query = BlogCategories().toString()

const body = JSON.stringify({
  query,
  variables: {},
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
    .then(({ body }) => {
      const blogCategories = body.data.amBlogCategories.items
      const blogCategory = randomFrom(blogCategories)

      Cypress.log({
        name: 'GetRandomBlogCategory',
        displayName: 'grbc',
        message: blogCategory.name,
      })

      return blogCategory
    })
