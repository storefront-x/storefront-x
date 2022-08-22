import useShopware from '#ioc/composables/useShopware'
import useToWishlistItem from '#ioc/mappers/useToWishlistItem'

export default () => {
  const shopware = useShopware()
  const toWishlistItem = useToWishlistItem()

  return async (): Promise<{
    items: ReturnType<typeof toWishlistItem>[]
  }> => {
    const response = await shopware.post(`/customer/wishlist`)
    console.log('wishlist repository', response)
    return {
      items: response?.products?.elements?.map(toWishlistItem) ?? [],
    }
  }
}
