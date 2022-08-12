import useShopware from '#ioc/composables/useShopware'
import useToWishlistItem from '#ioc/mappers/useToWishlistItem'

export default () => {
  const shopware = useShopware()
  const toWishlistItem = useToWishlistItem()

  return async (): Promise<{
    items: ReturnType<typeof toWishlistItem>[]
  }> => {
    const response = await shopware.post(`/customer/wishlist`)

    return {
      items: response.products?.elements?.map(toWishlistItem) ?? [],
    }
  }
}
