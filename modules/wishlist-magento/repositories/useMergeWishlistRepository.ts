import useMagento from '#ioc/composables/useMagento'
import ToProduct from '#ioc/mappers/ToProduct'
import AddProductsToWishlist from '#ioc/graphql/mutations/AddProductsToWishlist'
import ToWishlistUserError from '#ioc/mappers/ToWishlistUserError'

export default () => {
  const magento = useMagento()

  return async (products: ReturnType<typeof ToProduct>[], id: any) => {
    try {
      const {
        data: { addProductsToWishlist },
      } = await magento.graphql(AddProductsToWishlist().with({ id, items: products }))

      if (!addProductsToWishlist) throw new Error()

      return {
        wishlist: addProductsToWishlist.wishlist,
        userErrors: addProductsToWishlist?.user_errors?.map(ToWishlistUserError),
      }
    } catch (e) {
      console.warn(e)
      return {
        wishlist: [],
      }
    }
  }
}
