import useCartItem from '#ioc/composables/useCartItem'
import useShopware from '#ioc/composables/useShopware'
import useToCart from '#ioc/mappers/useToCart'

interface Options {
  quantity?: number
}

export default () => {
  const shopware = useShopware()
  const toCart = useToCart()

  return async (
    cartItem: ReturnType<typeof useCartItem>,
    options: Options,
  ): Promise<{
    cart: ReturnType<typeof toCart>
  }> => {
    if (options.quantity === 0) {
      const response = await shopware.del(`/checkout/cart/line-item?ids[]=${cartItem.id}`)

      return {
        cart: toCart(response),
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
      cart: toCart(response),
    }
  }
}
