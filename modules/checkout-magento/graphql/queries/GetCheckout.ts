import field from '#ioc/graphql/field'
import Checkout from '#ioc/graphql/fragments/Checkout'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .cantBeCached()
    .variables({
      $cartId: 'String!',
    })
    .fields({
      cart: field()
        .args({
          cart_id: '$cartId',
        })
        .fields({
          ...Checkout(),
        }),
    })
