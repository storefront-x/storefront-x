import field from '#ioc/graphql/field'
import Cart from '#ioc/graphql/fragments/Cart'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
      $itemId: 'Int!',
    })
    .fields({
      removeItemFromCart: field()
        .args({
          input: {
            cart_id: '$cartId',
            cart_item_id: '$itemId',
          },
        })
        .fields({
          cart: field({
            ...Cart(),
          }),
        }),
    })
