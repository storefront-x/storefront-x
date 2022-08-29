import field from '#ioc/graphql/field'
import Checkout from '#ioc/graphql/fragments/Checkout'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
      $email: 'String!',
    })
    .fields({
      setGuestEmailOnCart: field()
        .args({
          input: {
            cart_id: '$cartId',
            email: '$email',
          },
        })
        .fields({
          cart: field({
            ...Checkout(),
          }),
        }),
    })
