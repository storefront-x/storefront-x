import useMagento from '#ioc/composables/useMagento'
import RemoveCouponFromCart from '#ioc/graphql/mutations/RemoveCouponFromCart'
import ToCart from '#ioc/mappers/ToCart'

export default () => {
  const magento = useMagento()

  return async (
    cartId: string,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const { data } = await magento.graphql(
      RemoveCouponFromCart().with({
        cartId,
      }),
    )

    return {
      cart: ToCart(data.removeCouponFromCart.cart),
    }
  }
}
