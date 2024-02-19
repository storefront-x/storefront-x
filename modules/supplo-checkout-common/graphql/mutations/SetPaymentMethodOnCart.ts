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
      setPaymentMethodOnCart: field()
        .args({
          input: {
            cart_id: '$cartId',
            payment_method: { code: '$code' },
          },
        })
        .fields({
          cart: field({
            ...Cart(),
          }),
        }),
    })
