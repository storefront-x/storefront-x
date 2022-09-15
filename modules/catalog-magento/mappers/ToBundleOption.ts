import ToProduct from '#ioc/mappers/ToProduct'
import ToBundleOptionValue from '#ioc/mappers/ToBundleOptionValue'

export default (currency: string) => (data: any) => ({
  id: data.id ?? null,
  product: ToProduct(data.product ?? []),
  quantity: data.quantity || 1,
  values: (data.values ?? []).map(ToBundleOptionValue(currency)),
  label: data.label || '',
})
