import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $id: 'String!',
      $code: 'String!',
    })
    .fields({
      confirmSubscribeEmailToNewsletter: field()
        .args({
          subscriber_id: '$id',
          subscriber_confirm_code: '$code',
        })
        .fields({
          status: field(),
        }),
    })
