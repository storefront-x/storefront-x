import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import Cart from '#ioc/graphql/fragments/Cart'
import Money from '#ioc/graphql/fragments/Money'

export default (name = 'checkout') =>
  fragment(name, 'Cart')
    .cantBeCached()
    .fields({
      ...Cart(),
      email: field(),
      billing_address: field({
        city: field(),
        country: field({
          code: field(),
        }),
        firstname: field(),
        lastname: field(),
        postcode: field(),
        street: field(),
        telephone: field(),
      }),
      shipping_addresses: field({
        city: field(),
        country: field({
          code: field(),
        }),
        firstname: field(),
        lastname: field(),
        postcode: field(),
        street: field(),
        telephone: field(),
        selected_shipping_method: field({
          carrier_code: field(),
          carrier_title: field(),
          method_code: field(),
          method_title: field(),
          amount: field({
            ...Money(),
          }),
        }),
        available_shipping_methods: field({
          carrier_code: field(),
          carrier_title: field(),
          method_code: field(),
          method_title: field(),
          price_excl_tax: field({
            ...Money(),
          }),
          price_incl_tax: field({
            ...Money(),
          }),
        }),
      }),
      selected_payment_method: field({
        code: field(),
        title: field(),
      }),
      available_payment_methods: field({
        code: field(),
        title: field(),
      }),
    })
