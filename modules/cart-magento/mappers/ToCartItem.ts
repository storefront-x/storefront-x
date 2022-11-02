import ToBundleOption from '#ioc/mappers/ToBundleOption'
import ToMoney from '#ioc/mappers/ToMoney'
import ToProduct from '#ioc/mappers/ToProduct'
import ToCartConfigurableOption from '#ioc/mappers/ToCartConfigurableOption'
import ToCartOption from '#ioc/mappers/ToCartOption'

export default (data: any) => ({
  id: data.id as string,
  price: ToMoney({
    currency: data.prices.row_total_including_tax.currency,
    value: data.prices.row_total_including_tax.value / data.quantity,
  }),
  rowTotal: ToMoney(data.prices.row_total_including_tax),
  quantity: data.quantity as number,
  product: ToProduct(data.product),
  stackable: true,
  configurableOptions: (data.configurable_options ?? []).map(ToCartConfigurableOption),
  bundleOptions: (data.bundle_options ?? []).map(ToBundleOption(data.prices?.price?.currency)),
  options: data.customizable_options?.map(ToCartOption),
})
