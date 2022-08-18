import useShopware from '#ioc/composables/useShopware'
import useToCart from '#ioc/mappers/useToCart'

export default () => {
  const shopware = useShopware()
  const toCart = useToCart()

  return async (): Promise<{
    cart: ReturnType<typeof toCart>
  }> => {
    const response = await shopware.get('/checkout/cart')

    return {
      cart: toCart(response),
    }
  }
}
