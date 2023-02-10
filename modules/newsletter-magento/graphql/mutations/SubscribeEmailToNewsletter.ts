import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $email: 'String!',
    })
    .fields({
      subscribeEmailToNewsletter: field()
        .args({
          email: '$email',
        })
        .fields({
          status: field(),
        }),
    })
