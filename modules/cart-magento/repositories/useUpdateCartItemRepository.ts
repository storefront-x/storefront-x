import useCartItem from '#ioc/composables/useCartItem'
import useMagento from '#ioc/composables/useMagento'
import UpdateCartItems from '#ioc/graphql/mutations/UpdateCartItems'
import ToCart from '#ioc/mappers/ToCart'

interface Options {
  quantity?: number
}

export default () => {
  const magento = useMagento()

  return async (
    cartId: string,
    cartItem: ReturnType<typeof useCartItem>,
    options: Options,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
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
      cart: ToCart(data.updateCartItems.cart),
    }
  }
}
