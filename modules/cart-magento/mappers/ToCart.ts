import ToCartItem from '#ioc/mappers/ToCartItem'
import ToCartPrices from '#ioc/mappers/ToCartPrices'

export default (data: any) => ({
  id: data.id as string,
  items: data.items.map(ToCartItem),
  coupons: [],
  prices: ToCartPrices(data.prices),
})
