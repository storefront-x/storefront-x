import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query({
    currencyConfig: field('currency', {
      base_currency_code: field(),
      available_currency_codes: field(),
    }),
  })
