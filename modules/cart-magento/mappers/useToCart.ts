import useToCartItem from '#ioc/mappers/useToCartItem'
import useToCartPrices from '#ioc/mappers/useToCartPrices'

export default () => {
  const toCartItem = useToCartItem()
  const toCartPrices = useToCartPrices()

  return (data: any) => ({
    id: data.id as string,
    items: data.items.map(toCartItem),
    coupons: [],
    prices: toCartPrices(data.prices),
  })
}
