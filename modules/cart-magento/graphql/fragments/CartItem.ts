import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import Money from '#ioc/graphql/fragments/Money'
import ProductInListing from '#ioc/graphql/fragments/ProductInListing'
import on from '#ioc/graphql/on'

export default (name = 'cartItem') =>
  fragment(name, 'CartItemInterface')
    .cantBeCached()
    .fields({
      id: field(),
      quantity: field(),
      prices: field({
        price: field({
          ...Money(),
        }),
        total_item_discount: field({
          ...Money(),
        }),
        row_total: field({
          ...Money(),
        }),
        row_total_including_tax: field({
          ...Money(),
        }),
      }),
      product: field({
        ...ProductInListing(),
      }),
      ...on('SimpleCartItem', {
        customizable_options: field({
          label: field(),
          customizable_option_uid: field(),
          values: field({
            customizable_option_value_uid: field(),
            label: field(),
          }),
        }),
      }),
      ...on('ConfigurableCartItem', {
        configurable_options: field({
          option_label: field(),
          value_label: field(),
        }),
      }),
      ...on('BundleCartItem', {
        bundle_options: field({
          type: field(),
          label: field(),
          uid: field(),
          values: field({
            price: field(),
            quantity: field(),
            label: field(),
            id: field(),
          }),
        }),
      }),
    })
