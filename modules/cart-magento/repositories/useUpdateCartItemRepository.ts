import useCartItem from '#ioc/composables/useCartItem'
import useMagento from '#ioc/composables/useMagento'
import UpdateCartItems from '#ioc/graphql/mutations/UpdateCartItems'
import useToCart from '#ioc/mappers/useToCart'

interface Options {
  quantity?: number
}

export default () => {
  const magento = useMagento()
  const toCart = useToCart()

  return async (
    cartId: string,
    cartItem: ReturnType<typeof useCartItem>,
    options: Options,
  ): Promise<{
    cart: ReturnType<typeof toCart>
  }> => {
    const { data } = await magento.graphql(
      UpdateCartItems().with({
        cartId,
        cartItems: [
          {
            cart_item_id: cartItem.id,
            quantity: options.quantity,
          },
        ],
      }),
    )

    return {
      cart: toCart(data.updateCartItems.cart),
    }
  }
}
