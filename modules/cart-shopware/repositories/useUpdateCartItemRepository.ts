import useCartItem from '#ioc/composables/useCartItem'
import useShopware from '#ioc/composables/useShopware'
import useToCartItem from '#ioc/mappers/useToCartItem'
import useToCartPrices from '#ioc/mappers/useToCartPrices'

interface Options {
  quantity?: number
}

export default () => {
  const shopware = useShopware()
  const toCartItem = useToCartItem()
  const toCartPrices = useToCartPrices()

  return async (
    cartItem: ReturnType<typeof useCartItem>,
    options: Options,
  ): Promise<{
    items: ReturnType<typeof toCartItem>[]
    prices: ReturnType<typeof toCartPrices>
  }> => {
    if (options.quantity === 0) {
      const response = await shopware.del(`/checkout/cart/line-item?ids[]=${cartItem.id}`)

      return {
        items: response.lineItems.map(toCartItem),
        prices: toCartPrices(response.price),
      }
    }

    const response = await shopware.patch('/checkout/cart/line-item', {
      items: [
        {
          id: cartItem.id,
          ...options,
        },
      ],
    })

    return {
      items: response.lineItems.map(toCartItem),
      prices: toCartPrices(response.price),
    }
  }
}
