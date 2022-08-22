import useShopware from '#ioc/composables/useShopware'
import useToCart from '#ioc/mappers/useToCart'
import useCartItem from '#ioc/composables/useCartItem'

export default () => {
  const shopware = useShopware()
  const toCart = useToCart()

  return async (
    cartItem: ReturnType<typeof useCartItem>,
  ): Promise<{
    cart: ReturnType<typeof toCart>
  }> => {
    const response = await shopware.del(`/checkout/cart/line-item?ids[]=${cartItem.id}`)

    return {
      cart: toCart(response),
    }
  }
}
