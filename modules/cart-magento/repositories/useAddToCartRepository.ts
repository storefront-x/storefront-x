import useMagento from '#ioc/composables/useMagento'
import useProduct from '#ioc/composables/useProduct'
import AddProductsToCart from '#ioc/graphql/mutations/AddProductsToCart'
import useToCart from '#ioc/mappers/useToCart'

export default () => {
  const magento = useMagento()
  const toCart = useToCart()

  return async (
    cartId: string,
    product: ReturnType<typeof useProduct>,
  ): Promise<{
    cart: ReturnType<typeof toCart>
  }> => {
    const { data } = await magento.graphql(
      AddProductsToCart().with({
        cartId,
        cartItems: [
          {
            sku: product.sku,
          },
        ],
      }),
    )

    return {
      cart: toCart(data.cart),
    }
  }
}
