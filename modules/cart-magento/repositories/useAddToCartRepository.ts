import useMagento from '#ioc/composables/useMagento'
import useProduct from '#ioc/composables/useProduct'
import AddProductsToCart from '#ioc/graphql/mutations/AddProductsToCart'
import ToCart from '#ioc/mappers/ToCart'

interface Options {
  quantity?: number
}

export default () => {
  const magento = useMagento()

  return async (
    cartId: string,
    product: ReturnType<typeof useProduct>,
    { quantity = 1 }: Options = {},
  ): Promise<{
    cart: ReturnType<typeof ToCart>
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
      cart: ToCart(data.addProductsToCart.cart),
    }
  }
}
