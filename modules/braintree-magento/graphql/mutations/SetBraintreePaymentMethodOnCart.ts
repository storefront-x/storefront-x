import field from '#ioc/graphql/field'
import Checkout from '#ioc/graphql/fragments/Checkout'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
      $code: 'String!',
      $nonce: 'String!',
      $deviceData: 'String',
    })
    .fields({
      setPaymentMethodOnCart: field()
        .args({
          input: {
            cart_id: '$cartId',
            payment_method: {
              code: '$code',
              braintree: {
                payment_method_nonce: '$nonce',
                device_data: '$deviceData',
                is_active_payment_token_enabler: false,
              },
            },
          },
        })
        .fields({
          cart: field({
            ...Checkout(),
          }),
        }),
    })
