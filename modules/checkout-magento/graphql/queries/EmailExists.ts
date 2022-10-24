import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .cantBeCached()
    .variables({
      $email: 'String!',
    })
    .fields({
      isEmailAvailable: field()
        .args({
          email: '$email',
        })
        .fields({
          is_email_available: field(),
        }),
    })
