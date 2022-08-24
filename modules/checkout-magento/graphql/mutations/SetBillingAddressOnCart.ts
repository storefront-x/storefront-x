import field from '#ioc/graphql/field'
import Checkout from '#ioc/graphql/fragments/Checkout'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
      $address: 'CartAddressInput',
      $sameAsShipping: 'Boolean',
    })
    .fields({
      setBillingAddressOnCart: field()
        .args({
          input: {
            cart_id: '$cartId',
            billing_address: {
              address: '$address',
              same_as_shipping: '$sameAsShipping',
            },
          },
        })
        .fields({
          cart: field({
            ...Checkout(),
          }),
        }),
    })
