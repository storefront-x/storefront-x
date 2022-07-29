import useShopware from '#ioc/composables/useShopware'
import useToCartItem from '#ioc/mappers/useToCartItem'
import useCartItem from '#ioc/composables/useCartItem'
import useToCartPrices from '#ioc/mappers/useToCartPrices'

export default () => {
  const shopware = useShopware()
  const toCartItem = useToCartItem()
  const toCartPrices = useToCartPrices()

  return async (
    cartItem: ReturnType<typeof useCartItem>,
  ): Promise<{
    items: ReturnType<typeof toCartItem>[]
    prices: ReturnType<typeof toCartPrices>
  }> => {
    const response = await shopware.del(`/checkout/cart/line-item?ids[]=${cartItem.id}`)

    return {
      items: response.lineItems.map(toCartItem),
      prices: toCartPrices(response.price),
    }
  }
}
