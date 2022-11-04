import useMagento from '#ioc/composables/useMagento'
import ApplyCouponToCart from '#ioc/graphql/mutations/ApplyCouponToCart'
import ToCart from '#ioc/mappers/ToCart'

export default () => {
  const magento = useMagento()

  return async (
    cartId: string,
    code: string,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const { data } = await magento.graphql(
      ApplyCouponToCart().with({
        cartId,
        code,
      }),
    )

    return {
      cart: ToCart(data.applyCouponToCart.cart),
    }
  }
}
