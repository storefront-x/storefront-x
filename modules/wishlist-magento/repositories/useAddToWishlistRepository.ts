import useProduct from '#ioc/composables/useProduct'
import useMagento from '#ioc/composables/useMagento'
import AddProductsToWishlist from '#ioc/graphql/mutations/AddProductsToWishlist'
import ToWishlistUserError from '#ioc/mappers/ToWishlistUserError'
import useWishlistStore from '#ioc/stores/useWishlistStore'

export default () => {
  const magento = useMagento()
  const wishlistStore = useWishlistStore()

  return async (
    product: ReturnType<typeof useProduct>,
  ): Promise<{
    userErrors: ReturnType<typeof ToWishlistUserError> | []
    _error?: any
  }> => {
    // @ts-ignore
    try {
      const id = wishlistStore.id

      const {
        data: { addProductsToWishlist },
      } = await magento.graphql(AddProductsToWishlist().with({ id, items: [{ sku: product?.sku, quantity: 1 }] }))

      return {
        userErrors: addProductsToWishlist?.user_errors?.map(ToWishlistUserError),
      }
    } catch (e) {
      return {
        userErrors: [],
        _error: e,
      }
    }
  }
}
