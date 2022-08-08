import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({})
    .fields({
      revokeCustomerToken: field().fields({
        result: field(),
      }),
    })
