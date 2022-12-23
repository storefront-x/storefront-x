import useShopware from '#ioc/composables/useShopware'
import ToCart from '#ioc/mappers/ToCart'
import useCartItem from '#ioc/composables/useCartItem'
import useAddSeoPathToCartItems from '#ioc/services/useAddSeoPathToCartItems'

export default () => {
  const shopware = useShopware()
  const addSeoPathToItems = useAddSeoPathToCartItems()

  return async (
    cartItem: ReturnType<typeof useCartItem>,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const response = await shopware.del(`/checkout/cart/line-item?ids[]=${cartItem.id}`)
    const responseWithURLs = await addSeoPathToItems(response)

    return {
      cart: ToCart(responseWithURLs),
    }
  }
}
