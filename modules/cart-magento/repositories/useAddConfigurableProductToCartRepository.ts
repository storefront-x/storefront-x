import useMagento from '#ioc/composables/useMagento'
import useProduct from '#ioc/composables/useProduct'
import AddConfigurableProductsToCart from '#ioc/graphql/mutations/AddConfigurableProductsToCart'
import ToCart from '#ioc/mappers/ToCart'

interface Options {
  quantity?: number
  variantSku?: string
}

export default () => {
  const magento = useMagento()

  return async (
    cartId: string,
    product: ReturnType<typeof useProduct>,
    { quantity = 1, variantSku }: Options = {},
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const variant = {
      sku: variantSku,
      quantity,
    }

    const { data } = await magento.graphql(
      AddConfigurableProductsToCart().with({
        cartId,
        cartItems: [
          {
            parent_sku: product.sku,
            data: variant,
          },
        ],
      }),
    )

    return {
      cart: ToCart({
        ...data.addConfigurableProductsToCart.cart,
        variant,
      }),
    }
  }
}
