import useProduct from '#ioc/composables/useProduct'
import useMagento from '#ioc/composables/useMagento'
import AddProductsToWishlist from '#ioc/graphql/mutations/AddProductsToWishlist'
import useWishlistStore from '#ioc/stores/useWishlistStore'

export default () => {
  const magento = useMagento()
  const wishlistStore = useWishlistStore()

  return async (product: ReturnType<typeof useProduct>) => {
    // @ts-ignore
    const id = wishlistStore.id

    const {
      data: { addProductsToWishlist },
    } = await magento.graphql(AddProductsToWishlist().with({ id, items: [{ sku: product?.sku, quantity: 1 }] }))

    if (addProductsToWishlist?.user_errors?.length > 0) {
      throw new Error(addProductsToWishlist.user_errors[0].message)
    }
  }
}
