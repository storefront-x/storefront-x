import useCartItem from '#ioc/composables/useCartItem'
import useShopware from '#ioc/composables/useShopware'
import ToCart from '#ioc/mappers/ToCart'
import useAddSeoPathToCartItems from '#ioc/services/useAddSeoPathToCartItems'

interface Options {
  quantity?: number
}

export default () => {
  const shopware = useShopware()
  const addSeoPathToItems = useAddSeoPathToCartItems()

  return async (
    cartItem: ReturnType<typeof useCartItem>,
    options: Options,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    if (options.quantity === 0) {
      const response = await shopware.del(`/checkout/cart/line-item?ids[]=${cartItem.id}`)
      const responseWithURLs = await addSeoPathToItems(response)

      return {
        cart: ToCart(responseWithURLs),
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
    const responseWithURLs = await addSeoPathToItems(response)

    return {
      cart: ToCart(responseWithURLs),
    }
  }
}
