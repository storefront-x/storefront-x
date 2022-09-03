import useCartItem from '#ioc/composables/useCartItem'
import useMagento from '#ioc/composables/useMagento'
import RemoveItemFromCart from '#ioc/graphql/mutations/RemoveItemFromCart'
import ToCart from '#ioc/mappers/ToCart'

export default () => {
  const magento = useMagento()

  return async (
    cartId: string,
    cartItem: ReturnType<typeof useCartItem>,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const { data } = await magento.graphql(
      RemoveItemFromCart().with({
        cartId,
        itemId: cartItem.id,
      }),
    )

    return {
      cart: ToCart(data.removeItemFromCart.cart),
    }
  }
}
