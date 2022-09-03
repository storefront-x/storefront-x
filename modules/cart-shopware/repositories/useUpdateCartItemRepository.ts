import useCartItem from '#ioc/composables/useCartItem'
import useShopware from '#ioc/composables/useShopware'
import ToCart from '#ioc/mappers/ToCart'

interface Options {
  quantity?: number
}

export default () => {
  const shopware = useShopware()

  return async (
    cartItem: ReturnType<typeof useCartItem>,
    options: Options,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    if (options.quantity === 0) {
      const response = await shopware.del(`/checkout/cart/line-item?ids[]=${cartItem.id}`)

      return {
        cart: ToCart(response),
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
      cart: ToCart(response),
    }
  }
}
