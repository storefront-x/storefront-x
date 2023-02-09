import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import Money from '#ioc/graphql/fragments/Money'
import CustomizableOptionInterface from '#ioc/graphql/fragments/CustomizableOptionInterface'
import on from '#ioc/graphql/on'

export default (name = 'ProductInListing') =>
  fragment(name, 'ProductInterface', {
    __typename: field(),
    id: field(),
    sku: field(),
    name: field(),
    categories: field({
      name: field(),
      url_path: field(),
      url_suffix: field(),
    }),
    url_key: field(),
    url_suffix: field(),
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
    ...on('SimpleProduct', {
      options: field({
        ...CustomizableOptionInterface(),
      }),
    }),
  })
