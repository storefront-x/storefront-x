import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $email: 'String!',
    })
    .fields({
      requestPasswordResetEmail: field().args({
        email: '$email',
      }),
    })
