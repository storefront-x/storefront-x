import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import BundleItem from '#ioc/graphql/fragments/BundleItem'
import ConfigurableProduct from '#ioc/graphql/fragments/ConfigurableProduct'
import CustomizableOptionInterface from '#ioc/graphql/fragments/CustomizableOptionInterface'
import GroupedItem from '#ioc/graphql/fragments/GroupedItem'
import Money from '#ioc/graphql/fragments/Money'
import on from '#ioc/graphql/on'

export default (name = 'product') =>
  fragment(name, 'ProductInterface', {
    __typename: field(),
    id: field(),
    sku: field(),
    name: field(),
    url_key: field(),
    stock_status: field(),
    only_x_left_in_stock: field(),
    categories: field({
      name: field(),
      url_path: field(),
    }),
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
    meta_title: field(),
    meta_description: field(),
    meta_keyword: field(),
    ...on('SimpleProduct', {
      options: field({
        ...CustomizableOptionInterface(),
      }),
    }),
    ...on('ConfigurableProduct', {
      ...ConfigurableProduct(),
    }),
    ...on('BundleProduct', {
      items: field({
        ...BundleItem(),
      }),
    }),
    ...on('GroupedProduct', {
      items: field({
        ...GroupedItem(),
      }),
    }),
  })
