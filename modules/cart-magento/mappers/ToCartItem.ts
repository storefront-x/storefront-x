import ToMoney from '#ioc/mappers/ToMoney'
import ToProduct from '#ioc/mappers/ToProduct'

export default (data: any) => ({
  id: data.id as string,
  price: ToMoney(data.prices.price),
  rowTotal: ToMoney(data.prices.row_total),
  quantity: data.quantity as number,
  product: ToProduct(data.product),
  stackable: true,
})
