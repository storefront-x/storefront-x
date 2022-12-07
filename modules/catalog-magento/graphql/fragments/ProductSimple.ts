import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import Money from '#ioc/graphql/fragments/Money'

export default (name = 'product') =>
  fragment(name, 'ProductInterface', {
    __typename: field(),
    name: field(),
    url_key: field(),
    stock_status: field(),
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
  })
