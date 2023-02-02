import ToProduct from '#ioc/mappers/ToProduct'
import ToProductCompareAttribute from '#ioc/mappers/ToProductCompareAttribute'

export default (data: any) => ({
  product: ToProduct(data?.product ?? {}),
  attributes: data?.attributes.map(ToProductCompareAttribute) ?? [],
})
