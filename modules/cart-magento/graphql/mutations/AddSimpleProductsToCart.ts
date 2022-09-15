import field from '#ioc/graphql/field'
import Cart from '#ioc/graphql/fragments/Cart'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
      $cartItems: '[SimpleProductCartItemInput!]!',
    })
    .fields({
      addSimpleProductsToCart: field('addSimpleProductsToCart')
        .args({
          input: {
            cart_id: '$cartId',
            cart_items: '$cartItems',
          },
        })
        .fields({
          cart: field({
            ...Cart(),
          }),
        }),
    })
