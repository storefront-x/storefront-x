import ToCartItem from '#ioc/mappers/ToCartItem'
import ToCartPrices from '#ioc/mappers/ToCartPrices'

export default (data: any) => ({
  items: (data.lineItems as any[]).map(ToCartItem),
  prices: ToCartPrices(data.price),
})
