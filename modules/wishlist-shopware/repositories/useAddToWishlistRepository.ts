import useProduct from '#ioc/composables/useProduct'
import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (
    product: ReturnType<typeof useProduct>,
  ): Promise<{
    success: boolean
  }> => {
    const response = await shopware.post(`/customer/wishlist/add/${product.id}`)

    return {
      success: response.success,
    }
  }
}
