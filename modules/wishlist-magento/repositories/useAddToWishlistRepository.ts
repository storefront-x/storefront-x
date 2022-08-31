import useProduct from '#ioc/composables/useProduct'
import useMagento from '#ioc/composables/useMagento'
import AddProductsToWishlist from '#ioc/graphql/mutations/AddProductsToWishlist'
import useWishlistStore from '#ioc/stores/useWishlistStore'

export default () => {
  const magento = useMagento()
  const wishlistStore = useWishlistStore()

  return async (product?: ReturnType<typeof useProduct>, items?: ReturnType<typeof useProduct>[], wishlistId?: any) => {
    // @ts-ignore
    const id = wishlistId ?? wishlistStore.id

    const { data } = await magento.graphql(
      AddProductsToWishlist().with({ id, items: items ?? [{ sku: product?.sku, quantity: 1 }] }),
    )

    if (!data) throw new Error()
  }
}
