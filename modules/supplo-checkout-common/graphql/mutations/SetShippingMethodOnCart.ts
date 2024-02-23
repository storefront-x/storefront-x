import field from '#ioc/graphql/field'
import Cart from '#ioc/graphql/fragments/Cart'
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
            ...Cart(),
          }),
        }),
    })
