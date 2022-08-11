import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'
import Customer from '#ioc/graphql/fragments/Customer'

export default () =>
  mutation()
    .variables({
      $firstName: 'String!',
      $lastName: 'String!',
      $email: 'String!',
      $password: 'String!',
    })
    .fields({
      createCustomer: field()
        .args({
          input: {
            firstname: '$firstName',
            lastname: '$lastName',
            email: '$email',
            password: '$password',
          },
        })
        .fields({
          customer: field({
            ...Customer(),
          }),
        }),
    })
