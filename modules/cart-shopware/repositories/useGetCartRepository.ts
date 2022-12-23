import useShopware from '#ioc/composables/useShopware'
import useAddSeoPathToCartItem from '#ioc/services/useAddSeoPathToCartItem'
import ToCart from '#ioc/mappers/ToCart'

export default () => {
  const shopware = useShopware()
  const addSeoPathToItem = useAddSeoPathToCartItem()

  return async (): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const response = await shopware.get('/checkout/cart')
    const responseWithURLs = await addSeoPathToItem(response)

    return {
      cart: ToCart(responseWithURLs),
    }
  }
}
