import useMagento from '#ioc/composables/useMagento'
import useProduct from '#ioc/composables/useProduct'
import useWishlistStore from '#ioc/stores/useWishlistStore'
import RemoveProductsFromWishlist from '#ioc/graphql/mutations/RemoveProductsFromWishlist'

export default () => {
  const magento = useMagento()
  const wishlistStore = useWishlistStore()

  return async (product: ReturnType<typeof useProduct>) => {
    // @ts-ignore
    const id = wishlistStore.id
    const item = wishlistStore.items.find((item) => item.product.id === product.id)

    if (!item) throw new Error('Wishlist item not found')

    const { data } = await magento.graphql(RemoveProductsFromWishlist().with({ id, itemIds: [item.id] }))

    if (!data) throw new Error()
  }
}
