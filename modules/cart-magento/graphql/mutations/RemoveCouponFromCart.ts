import field from '#ioc/graphql/field'
import Cart from '#ioc/graphql/fragments/Cart'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
    })
    .fields({
      removeCouponFromCart: field()
        .args({
          input: {
            cart_id: '$cartId',
          },
        })
        .fields({
          cart: field({
            ...Cart(),
          }),
        }),
    })
