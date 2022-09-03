import useShopware from '#ioc/composables/useShopware'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    items: ReturnType<typeof ToWishlistItem>[]
  }> => {
    try {
      const response = await shopware.post(`/customer/wishlist`)
      return {
        items: response?.products?.elements?.map(ToWishlistItem) ?? [],
      }
    } catch (error) {
      console.warn(error)
      return {
        items: [],
      }
    }
  }
}
