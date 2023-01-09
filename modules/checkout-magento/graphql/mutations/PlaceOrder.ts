import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
    })
    .fields({
      placeOrder: field()
        .args({
          input: { cart_id: '$cartId' },
        })
        .fields({
          order: field({
            order_number: field(),
          }),
        }),
    })
