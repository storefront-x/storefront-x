import field from '#ioc/graphql/field'
import Extension from '#ioc/types/base/Extension'
import addFields from '#ioc/utils/graphql/addFields'
import ProductLabel from '#ioc/graphql/fragments/ProductLabel'

const Product: Extension = (Product) => () => {
  const self = Product()

  addFields(self, {
    product_labels: field({
      items: field({
        ...ProductLabel(),
      }),
    }),
  })

  return self
}

export default Product
