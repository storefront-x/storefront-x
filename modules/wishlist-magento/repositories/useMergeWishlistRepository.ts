import useMagento from '#ioc/composables/useMagento'
import AddProductsToWishlist from '#ioc/graphql/mutations/AddProductsToWishlist'
import useWishlistMagentoStore from '#ioc/stores/useWishlistMagentoStore'

export default () => {
  const magento = useMagento()
  const wishlistMagentoStore = useWishlistMagentoStore()

  return async (ids: string[]) => {
    const id = wishlistMagentoStore.wishlistId

    const items = ids.map((id) => ({ sku: id, quantity: 1 }))
    const {
      data: { addProductsToWishlist },
    } = await magento.graphql(AddProductsToWishlist().with({ id, items }))

    if (!addProductsToWishlist) throw new Error()

    return {
      wishlist: addProductsToWishlist.wishlist,
    }
  }
}
