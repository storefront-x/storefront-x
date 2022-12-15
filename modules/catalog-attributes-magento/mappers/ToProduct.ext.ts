import ToProductAttribute from '#ioc/mappers/ToProductAttribute'
import Extension from '#ioc/types/base/Extension'

interface Attributes {
  attributes: ReturnType<typeof ToProductAttribute>[]
}

const ToProduct: Extension<Attributes> = (ToProduct) => (data) => {
  const product = ToProduct(data)

  product.attributes = data.sfx_attributes?.map(ToProductAttribute) ?? []

  return product
}

export default ToProduct
