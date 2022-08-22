import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import CartItem from '#ioc/graphql/fragments/CartItem'
import Money from '#ioc/graphql/fragments/Money'

export default (name = 'cart') =>
  fragment(name, 'Cart')
    .cantBeCached()
    .fields({
      id: field(),
      items: field({
        ...CartItem(),
      }),
      applied_coupons: field({
        code: field(),
      }),
      prices: field({
        grand_total: field({
          ...Money(),
        }),
        subtotal_including_tax: field({
          ...Money(),
        }),
        subtotal_excluding_tax: field({
          ...Money(),
        }),
        applied_taxes: field({
          label: field(),
          amount: field({
            ...Money(),
          }),
        }),
        discounts: field({
          label: field(),
          amount: field({
            ...Money(),
          }),
        }),
      }),
      shipping_addresses: field({
        selected_shipping_method: field({
          method_code: field(),
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
    })
