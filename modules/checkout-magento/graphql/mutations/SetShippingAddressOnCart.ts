import field from '#ioc/graphql/field'
import Checkout from '#ioc/graphql/fragments/Checkout'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({ $input: 'SetShippingAddressesOnCartInput!' })
    .fields({
      setShippingAddressOnCart: field('setShippingAddressesOnCart')
        .args({
          input: '$input',
        })
        .fields({
          cart: field({
            ...Checkout(),
          }),
        }),
    })
