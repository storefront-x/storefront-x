import ToProductLabel from '#ioc/mappers/ToProductLabel'

export default (self: any) => {
  return (data: any) => {
    const _self = self(data)

    _self.productLabels = data.product_labels?.items.map(ToProductLabel) ?? []

    return _self
  }
}
