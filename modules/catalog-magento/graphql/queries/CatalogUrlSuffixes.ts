import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query({
    storeConfig: field({
      product_url_suffix: field(),
      category_url_suffix: field(),
    }),
  })
