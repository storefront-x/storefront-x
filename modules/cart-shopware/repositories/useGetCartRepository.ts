import useShopware from '#ioc/composables/useShopware'
import useAddSeoPathToCartItems from '#ioc/services/useAddSeoPathToCartItems'
import ToCart from '#ioc/mappers/ToCart'

export default () => {
  const shopware = useShopware()
  const addSeoPathToItems = useAddSeoPathToCartItems()

  return async (): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const response = await shopware.get('/checkout/cart')
    const responseWithURLs = await addSeoPathToItems(response)

    return {
      cart: ToCart(responseWithURLs),
    }
  }
}
