import useShopware from '#ioc/composables/useShopware'
import ToCart from '#ioc/mappers/ToCart'
import useCartItem from '#ioc/composables/useCartItem'
import useAddSeoPathToCartItem from '#ioc/services/useAddSeoPathToCartItem'

export default () => {
  const shopware = useShopware()
  const addSeoPathToItem = useAddSeoPathToCartItem()

  return async (
    cartItem: ReturnType<typeof useCartItem>,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const response = await shopware.del(`/checkout/cart/line-item?ids[]=${cartItem.id}`)
    const responseWithURLs = await addSeoPathToItem(response)

    return {
      cart: ToCart(responseWithURLs),
    }
  }
}
