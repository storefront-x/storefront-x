import field from '#ioc/graphql/field'
import Cart from '#ioc/graphql/fragments/Cart'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
      $code: 'String!',
    })
    .fields({
      applyCouponToCart: field()
        .args({
          input: {
            cart_id: '$cartId',
            coupon_code: '$code',
          },
        })
        .fields({
          cart: field({
            ...Cart(),
          }),
        }),
    })
