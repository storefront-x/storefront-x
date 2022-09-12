import useMagento from '#ioc/composables/useMagento'
import useProduct from '#ioc/composables/useProduct'
import AddBundleProductsToCart from '#ioc/graphql/mutations/AddBundleProductsToCart'
import ToCart from '#ioc/mappers/ToCart'

interface Options {
  quantity?: number
  bundle?: object
}

export default () => {
  const magento = useMagento()

  return async (
    cartId: string,
    product: ReturnType<typeof useProduct>,
    { quantity = 1, bundle = {} }: Options = {},
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const selectedOptions = []
    for (const [itemId, item] of Object.entries(bundle)) {
      for (const [optionId, option] of Object.entries(item) as any) {
        selectedOptions.push({
          id: itemId,
          quantity: option.quantity,
          value: optionId,
        })
      }
    }

    const { data } = await magento.graphql(
      AddBundleProductsToCart().with({
        cartId,
        cartItems: [
          {
            bundle_options: selectedOptions,
            data: {
              sku: product.sku,
              quantity,
            },
          },
        ],
      }),
    )

    return {
      cart: ToCart(data.addBundleProductsToCart.cart),
    }
  }
}
