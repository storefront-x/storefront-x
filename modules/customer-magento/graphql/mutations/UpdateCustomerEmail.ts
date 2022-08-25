import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'
import Customer from '#ioc/graphql/fragments/Customer'

export default () =>
  mutation()
    .variables({
      $email: 'String!',
      $password: 'String!',
    })
    .fields({
      updateCustomerEmail: field()
        .args({
          email: '$email',
          password: '$password',
        })
        .fields({
          customer: field({
            ...Customer(),
          }),
        }),
    })
