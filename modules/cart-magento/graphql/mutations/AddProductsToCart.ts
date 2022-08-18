import field from '#ioc/graphql/field'
import Cart from '#ioc/graphql/fragments/Cart'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
      $cartItems: '[CartItemInput!]!',
    })
    .fields({
      addProductsToCart: field()
        .args({
          cartId: '$cartId',
          cartItems: '$cartItems',
        })
        .fields({
          cart: field({
            ...Cart(),
          }),
        }),
    })
