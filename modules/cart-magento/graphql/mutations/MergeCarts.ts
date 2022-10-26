import field from '#ioc/graphql/field'
import Cart from '#ioc/graphql/fragments/Cart'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $source: 'String!',
      $destination: 'String!',
    })
    .fields({
      mergeCarts: field()
        .args({
          source_cart_id: '$source',
          destination_cart_id: '$destination',
        })
        .fields({
          ...Cart(),
        }),
    })
