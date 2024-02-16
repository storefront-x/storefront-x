import useMagento from '#ioc/composables/useMagento'
import AddProductsToWishlist from '#ioc/graphql/mutations/AddProductsToWishlist'
import useWishlistMagentoStore from '#ioc/stores/useWishlistMagentoStore'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'

export default () => {
  const magento = useMagento()
  const wishlistMagentoStore = useWishlistMagentoStore()

  return async (sku: string) => {
    const id = wishlistMagentoStore.wishlistId

    const {
      data: { addProductsToWishlist },
    } = await magento.graphql(AddProductsToWishlist().with({ id, items: [{ sku, quantity: 1 }] }))
    if (addProductsToWishlist?.user_errors?.length > 0) {
      throw new Error(addProductsToWishlist.user_errors[0].message)
    }
    if (addProductsToWishlist.wishlist.items.length === 0) {
      return []
    }
    return addProductsToWishlist.wishlist.items.map((item: any) => ToWishlistItem(item))
  }
}
