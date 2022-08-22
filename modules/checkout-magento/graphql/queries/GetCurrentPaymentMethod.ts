import field from '#ioc/graphql/field'
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
          selected_payment_method: field({
            code: field(),
            title: field(),
          }),
        }),
    })
