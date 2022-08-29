import field from '#ioc/graphql/field'
import Checkout from '#ioc/graphql/fragments/Checkout'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $cartId: 'String!',
      $address: 'CartAddressInput',
      $pickupLocationCode: 'String',
    })
    .fields({
      setShippingAddressOnCart: field('setShippingAddressesOnCart')
        .args({
          input: {
            cart_id: '$cartId',
            shipping_addresses: [
              {
                address: '$address',
                pickup_location_code: '$pickupLocationCode',
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
