import useShopware from '#ioc/composables/useShopware'
import useToCartItem from '#ioc/mappers/useToCartItem'
import useToCartPrices from '#ioc/mappers/useToCartPrices'

export default () => {
  const shopware = useShopware()
  const toCartItem = useToCartItem()
  const toCartPrices = useToCartPrices()

  return async (): Promise<{
    items: ReturnType<typeof toCartItem>[]
    prices: ReturnType<typeof toCartPrices>
  }> => {
    const response = await shopware.get('/checkout/cart')

    return {
      items: response.lineItems.map(toCartItem),
      prices: toCartPrices(response.price),
    }
  }
}
