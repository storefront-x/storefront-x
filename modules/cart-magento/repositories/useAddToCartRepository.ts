import useMagento from '#ioc/composables/useMagento'
import useProduct from '#ioc/composables/useProduct'
import AddProductsToCart from '#ioc/graphql/mutations/AddProductsToCart'
import useToCart from '#ioc/mappers/useToCart'

interface Options {
  quantity?: number
}

export default () => {
  const magento = useMagento()
  const toCart = useToCart()

  return async (
    cartId: string,
    product: ReturnType<typeof useProduct>,
    { quantity = 1 }: Options = {},
  ): Promise<{
    cart: ReturnType<typeof toCart>
  }> => {
    const { data } = await magento.graphql(
      AddProductsToCart().with({
        cartId,
        cartItems: [
          {
            sku: product.sku,
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
