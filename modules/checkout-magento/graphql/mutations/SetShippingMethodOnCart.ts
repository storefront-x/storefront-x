import field from '#ioc/graphql/field'
import Checkout from '#ioc/graphql/fragments/Checkout'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
      $carrierCode: 'String!',
      $methodCode: 'String!',
    })
    .fields({
      setShippingMethodOnCart: field('setShippingMethodsOnCart')
        .args({
          input: {
            cart_id: '$cartId',
            shipping_methods: [
              {
                carrier_code: '$carrierCode',
                method_code: '$methodCode',
              },
            ],
          },
        })
        .fields({
          cart: field({
            ...Checkout(),
          }),
        }),
    })
