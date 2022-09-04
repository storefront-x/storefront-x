import ToProductLabel from '#ioc/mappers/ToProductLabel'

export default <T extends (...args: any[]) => any>(toProduct: T) => {
  return (data: any): ReturnType<T> => {
    const _toProduct = toProduct(data)

    _toProduct.productLabels = data.product_labels?.items.map(ToProductLabel) ?? []

    return _toProduct
  }
}
