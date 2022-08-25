import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'
import Customer from '#ioc/graphql/fragments/Customer'

export default () =>
  mutation()
    .variables({
      $currentPassword: 'String!',
      $newPassword: 'String!',
    })
    .fields({
      changeCustomerPassword: field()
        .args({
          currentPassword: '$currentPassword',
          newPassword: '$newPassword',
        })
        .fields({
          ...Customer(),
        }),
    })
