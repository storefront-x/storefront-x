import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $id: 'Int!',
    })
    .fields({
      deleteCustomerAddress: field().args({
        id: '$id',
      }),
    })
