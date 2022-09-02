import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query({
    availableCurrencies: field('currency', {
      available_currency_codes: field(),
    }),
  })
