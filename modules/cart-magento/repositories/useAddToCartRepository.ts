import useMagento from '#ioc/composables/useMagento'
import AddProductsToCart from '#ioc/graphql/mutations/AddProductsToCart'
import useToCart from '#ioc/mappers/useToCart'

interface Options {
  sku: string
  quantity?: number
}

export default () => {
  const magento = useMagento()
  const toCart = useToCart()

  return async (
    cartId: string,
    { sku, quantity = 1 }: Options,
  ): Promise<{
    cart: ReturnType<typeof toCart>
  }> => {
    const { data } = await magento.graphql(
      AddProductsToCart().with({
        cartId,
        cartItems: [
          {
            sku,
            quantity,
          },
        ],
      }),
    )

    return {
      cart: toCart(data.addProductsToCart.cart),
    }
  }
}
