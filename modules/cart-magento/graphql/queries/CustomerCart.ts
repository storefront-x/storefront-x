import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .cantBeCached()
    .fields({
      customerCart: field({
        id: field(),
      }),
    })
