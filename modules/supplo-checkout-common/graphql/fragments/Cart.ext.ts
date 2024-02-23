import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/graphql/addFields'

export default (self: any) => {
  return () => {
    const fragment = self()

    addFields(fragment, {
      available_payment_methods: field({
        code: field(),
        title: field(),
      }),
      selected_payment_method: field({
        code: field(),
        title: field(),
      }),
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
        available_shipping_methods: field({
          carrier_code: field(),
          method_code: field(),
        }),
        selected_shipping_method: field({
          amount: field({
            value: field(),
            currency: field(),
          }),
          carrier_code: field(),
          method_code: field(),
        }),
      }),
    })

    return fragment
  }
}
