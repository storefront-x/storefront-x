import useProduct from '#ioc/composables/useProduct'
import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (product: ReturnType<typeof useProduct>) => {
    const response = await shopware.post(`/customer/wishlist/add/${product.id}`)

    if (!response.success) throw new Error()
  }
}
