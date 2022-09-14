import ToMoney from '#ioc/mappers/ToMoney'
import ToProduct from '#ioc/mappers/ToProduct'

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
})
