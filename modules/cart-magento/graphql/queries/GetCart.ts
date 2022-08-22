import field from '#ioc/graphql/field'
import Cart from '#ioc/graphql/fragments/Cart'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .cantBeCached()
    .variables({
      $cartId: 'String!',
    })
    .fields({
      cart: field('cart')
        .args({
          cart_id: '$cartId',
        })
        .fields({
          ...Cart(),
        }),
    })
