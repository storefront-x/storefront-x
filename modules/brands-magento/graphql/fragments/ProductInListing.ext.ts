import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/graphql/addFields'
import Extension from '#ioc/types/base/Extension'

const ProductInListing: Extension = (ProductInListing) => () => {
  const self = ProductInListing()

  addFields(self, {
    brand: field(),
  })

  return self
}

export default ProductInListing
