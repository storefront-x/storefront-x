import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query({
    storeConfig: field({
      copyright: field(),
      base_currency_code: field(),
    }),
  })
