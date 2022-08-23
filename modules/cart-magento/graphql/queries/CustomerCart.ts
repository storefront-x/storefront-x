import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .cantBeCached()
    .ignoresErrors(['Some of the products are out of stock.'])
    .fields({
      customerCart: field({
        id: field(),
      }),
    })
