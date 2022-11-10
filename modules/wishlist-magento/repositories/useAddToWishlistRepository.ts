import useMagento from '#ioc/composables/useMagento'
import AddProductsToWishlist from '#ioc/graphql/mutations/AddProductsToWishlist'
import useWishlistMagentoStore from '#ioc/stores/useWishlistMagentoStore'

export default () => {
  const magento = useMagento()
  const wishlistMagentoStore = useWishlistMagentoStore()

  return async (sku: string) => {
    const id = wishlistMagentoStore.wishlistId

    const {
      data: { addProductsToWishlist },
    } = await magento.graphql(AddProductsToWishlist().with({ id, items: [{ sku, quantity: 1 }] }))
    if (addProductsToWishlist?.user_errors?.length > 0) {
      throw new Error(addProductsToWishlist.userErrors[0].message)
    }
  }
}
