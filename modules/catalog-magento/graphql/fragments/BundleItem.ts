import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import Money from '#ioc/graphql/fragments/Money'

export default (name = 'bundleItem') =>
  fragment(name, 'BundleItem', {
    __typename: field(),
    option_id: field(),
    type: field(),
    title: field(),
    sku: field(),
    required: field(),
    options: field({
      id: field(),
      quantity: field(),
      label: field(),
      product: field({
        id: field(),
        name: field(),
        sku: field(),
        short_description: field({
          html: field(),
        }),
        price_range: field({
          minimum_price: field({
            final_price: field({
              ...Money(),
            }),
          }),
        }),
      }),
    }),
  })
