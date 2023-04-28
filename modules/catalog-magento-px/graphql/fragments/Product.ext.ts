import field from '#ioc/graphql/field'
import Extension from '#ioc/types/base/Extension'
import addFields from '#ioc/utils/graphql/addFields'
import Money from '#ioc/graphql/fragments/Money'

const Product: Extension = (Product) => () => {
  const self = Product()

  addFields(self, `on BundleProduct`, {
    price_view: field(),
    price_range: field({
      minimum_price: field({
        final_price: field({
          ...Money(),
        }),
        regular_price: field({
          ...Money(),
        }),
      }),
      maximum_price: field({
        final_price: field({
          ...Money(),
        }),
        regular_price: field({
          ...Money(),
        }),
      }),
    }),
  })

  return self
}

export default Product
