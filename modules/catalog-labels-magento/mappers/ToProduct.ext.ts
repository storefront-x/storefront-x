import ToProductLabel from '#ioc/mappers/ToProductLabel'
import Extension from '#ioc/types/base/Extension'

interface Labels {
  labels: ReturnType<typeof ToProductLabel>[]
}

const ToProduct: Extension<Labels> = (ToProduct) => (data) => {
  const product = ToProduct(data)

  product.labels = data.product_labels?.items.map(ToProductLabel) ?? []

  return product
}

export default ToProduct
