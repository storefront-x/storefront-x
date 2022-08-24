import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import Address from '#ioc/graphql/fragments/Address'

export default () =>
  query()
    .cantBeCached()
    .fields({
      customer: field({
        addresses: field({
          ...Address(),
        }),
      }),
    })
