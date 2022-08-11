import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $email: 'String!',
      $password: 'String!',
    })
    .fields({
      generateCustomerToken: field()
        .args({
          email: '$email',
          password: '$password',
        })
        .fields({
          token: field(),
        }),
    })
