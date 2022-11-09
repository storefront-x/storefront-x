import useMagento from '#ioc/composables/useMagento'
import useWishlistMagentoStore from '#ioc/stores/useWishlistMagentoStore'
import RemoveProductsFromWishlist from '#ioc/graphql/mutations/RemoveProductsFromWishlist'

export default () => {
  const magento = useMagento()
  const wishlistMagentoStore = useWishlistMagentoStore()

  return async (sku: string) => {
    const id = wishlistMagentoStore.wishlistId

    const { data } = await magento.graphql(RemoveProductsFromWishlist().with({ id, itemIds: [sku] }))

    if (!data) throw new Error()
  }
}
