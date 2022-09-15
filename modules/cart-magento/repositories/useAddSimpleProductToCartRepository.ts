import useMagento from '#ioc/composables/useMagento'
import useProduct from '#ioc/composables/useProduct'
import AddSimpleProductsToCart from '#ioc/graphql/mutations/AddSimpleProductsToCart'
import ToCart from '#ioc/mappers/ToCart'

interface Options {
  quantity?: number
  options?: object
}

export default () => {
  const magento = useMagento()

  return async (
    cartId: string,
    product: ReturnType<typeof useProduct>,
    { quantity = 1, options = {} }: Options = {},
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const selectedOptions = []
    for (const [itemId, item] of Object.entries(options)) {
      for (const [id] of Object.entries(item) as any) {
        selectedOptions.push({
          id: itemId,
          value_string: String(id),
        })
      }
    }

    const { data } = await magento.graphql(
      AddSimpleProductsToCart().with({
        cartId,
        cartItems: [
          {
            customizable_options: selectedOptions,
            data: {
              quantity,
              sku: product.sku,
            },
          },
        ],
      }),
    )

    return {
      cart: ToCart(data.addSimpleProductsToCart.cart),
    }
  }
}
