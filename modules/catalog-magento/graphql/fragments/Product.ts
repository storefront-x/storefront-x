import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import Money from '#ioc/graphql/fragments/Money'

export default (name = 'product') =>
  fragment(name, 'ProductInterface', {
    __typename: field(),
    id: field(),
    sku: field(),
    name: field(),
    url_key: field(),
    stock_status: field(),
    only_x_left_in_stock: field(),
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
    description: field({
      html: field(),
    }),
    short_description: field({
      html: field(),
    }),
    thumbnail: field({
      url: field(),
    }),
    media_gallery: field({
      url: field(),
      label: field(),
      disabled: field(),
    }),
    rating_summary: field(),
    review_count: field(),
  })
