import useShopware from '#ioc/composables/useShopware'
import ToCart from '#ioc/mappers/ToCart'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const response = await shopware.get('/checkout/cart')

    return {
      cart: ToCart(response),
    }
  }
}
