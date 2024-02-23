import useMagento from '#ioc/composables/useMagento'
import useWishlistMagentoStore from '#ioc/stores/useWishlistMagentoStore'
import RemoveProductsFromWishlist from '#ioc/graphql/mutations/RemoveProductsFromWishlist'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'

export default () => {
  const magento = useMagento()
  const wishlistMagentoStore = useWishlistMagentoStore()

  return async (itemId: number) => {
    const id = wishlistMagentoStore.wishlistId

    const {
      data: { removeProductsFromWishlist },
    } = await magento.graphql(RemoveProductsFromWishlist().with({ id, itemIds: [itemId] }))

    if (removeProductsFromWishlist?.user_errors?.length > 0) {
      throw new Error(removeProductsFromWishlist.user_errors[0].message)
    }
    if (removeProductsFromWishlist.wishlist.items.length === 0) {
      return []
    }
    return removeProductsFromWishlist.wishlist.items.map((item: any) => ToWishlistItem(item))
  }
}
