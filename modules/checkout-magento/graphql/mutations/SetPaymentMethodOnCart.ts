import field from '#ioc/graphql/field'
import Checkout from '#ioc/graphql/fragments/Checkout'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
      $code: 'String!',
    })
    .fields({
      setPaymentMethodOnCart: field()
        .args({
          input: {
            cart_id: '$cartId',
            payment_method: { code: '$code' },
          },
        })
        .fields({
          cart: field({
            ...Checkout(),
          }),
        }),
    })
