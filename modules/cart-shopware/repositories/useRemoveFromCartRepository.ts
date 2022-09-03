import useShopware from '#ioc/composables/useShopware'
import ToCart from '#ioc/mappers/ToCart'
import useCartItem from '#ioc/composables/useCartItem'

export default () => {
  const shopware = useShopware()

  return async (
    cartItem: ReturnType<typeof useCartItem>,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const response = await shopware.del(`/checkout/cart/line-item?ids[]=${cartItem.id}`)

    return {
      cart: ToCart(response),
    }
  }
}
