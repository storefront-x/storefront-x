import ToProductAttribute from '#ioc/mappers/ToProductAttribute'
import Extension from '#ioc/types/base/Extension'

interface Attributes {
  attributes: ReturnType<typeof ToProductAttribute>[]
}

const ToProduct: Extension<Attributes> = (ToProduct) => (data) => {
  const product = ToProduct(data)

  const filteredAttributes = data.sfx_attributes?.filter((item: any) => item.value && item) ?? []

  product.attributes = filteredAttributes?.map(ToProductAttribute) ?? []

  return product
}

export default ToProduct
