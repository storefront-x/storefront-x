import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import Customer from '#ioc/graphql/fragments/Customer'

export default () =>
  query()
    .cantBeCached()
    .fields({
      customer: field({
        ...Customer(),
      }),
    })
