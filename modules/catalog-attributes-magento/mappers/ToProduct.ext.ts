import ToProductAttribute from '#ioc/mappers/ToProductAttribute'

export default <T extends (...args: any[]) => any>(toProduct: T) => {
  return (data: any): ReturnType<T> => {
    const _toProduct = toProduct(data)

    _toProduct.attributes = data?.mx_attributes?.map(ToProductAttribute) ?? []

    return _toProduct
  }
}
