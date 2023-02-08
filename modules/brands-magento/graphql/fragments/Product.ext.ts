import field from '#ioc/graphql/field'
import Extension from '#ioc/types/base/Extension'
import addFields from '#ioc/utils/graphql/addFields'

const Product: Extension = (Product) => () => {
  const self = Product()

  addFields(self, {
    brand: field(),
  })

  return self
}

export default Product
