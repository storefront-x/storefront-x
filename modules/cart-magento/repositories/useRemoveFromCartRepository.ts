import useCartItem from '#ioc/composables/useCartItem'
import useMagento from '#ioc/composables/useMagento'
import RemoveItemFromCart from '#ioc/graphql/mutations/RemoveItemFromCart'
import useToCart from '#ioc/mappers/useToCart'

export default () => {
  const magento = useMagento()
  const toCart = useToCart()

  return async (
    cartId: string,
    cartItem: ReturnType<typeof useCartItem>,
  ): Promise<{
    cart: ReturnType<typeof toCart>
  }> => {
    const { data } = await magento.graphql(
      RemoveItemFromCart().with({
        cartId,
        itemId: cartItem.id,
      }),
    )

    return {
      cart: toCart(data.removeItemFromCart.cart),
    }
  }
}
