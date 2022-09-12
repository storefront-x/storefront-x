import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'

export default (name = 'configurableProduct') =>
  fragment(name, 'ConfigurableProduct', {
    __typename: field(),
    configurable_options: field({
      id: field(),
      label: field(),
      attribute_code: field(),
      values: field({
        value_index: field(),
        label: field(),
        swatch_data: field({
          value: field(),
        }),
      }),
      product_id: field(),
    }),
    variants: field({
      product: field({
        id: field(),
        name: field(),
        sku: field(),
        stock_status: field(),
        media_gallery: field({
          url: field(),
          label: field(),
        }),
        thumbnail: field({
          url: field(),
        }),
        attribute_set_id: field(),
      }),
      attributes: field({
        label: field(),
        code: field(),
        value_index: field(),
      }),
    }),
  })
