import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import Money from '#ioc/graphql/fragments/Money'

export default (name = 'GroupedProductItem') =>
  fragment(name, 'GroupedProductItem', {
    position: field(),
    product: field({
      id: field(),
      name: field(),
      url_key: field(),
      price_range: field({
        minimum_price: field({
          final_price: field({
            ...Money(),
          }),
          regular_price: field({
            ...Money(),
          }),
        }),
      }),
      thumbnail: field({
        url: field(),
      }),
    }),
    qty: field(),
  })
