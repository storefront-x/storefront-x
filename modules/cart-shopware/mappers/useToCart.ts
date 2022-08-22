import useToCartItem from '#ioc/mappers/useToCartItem'
import useToCartPrices from '#ioc/mappers/useToCartPrices'

export default () => {
  const toCartItem = useToCartItem()
  const toCartPrices = useToCartPrices()

  return (data: any) => ({
    items: data.lineItems.map(toCartItem) as ReturnType<typeof toCartItem>[],
    prices: toCartPrices(data.price),
  })
}
