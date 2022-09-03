import useCookies from '#ioc/composables/useCookies'
import useCustomer from '#ioc/composables/useCustomer'
import useGetWishlistRepository from '#ioc/repositories/useGetWishlistRepository'
import WISHLIST_COOKIES_NAME from '#ioc/config/WISHLIST_COOKIES_NAME'
import useGetProductsByIdsRepository from '#ioc/repositories/useGetProductsByIdsRepository'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'

export default () => {
  const cookies = useCookies()
  const customer = useCustomer()
  const getWishlistRepository = useGetWishlistRepository()
  const getProductsByIdsRepository = useGetProductsByIdsRepository()

  return async (): Promise<{
    items: ReturnType<typeof ToWishlistItem>[]
  }> => {
    if (customer.isLoggedIn) {
      const wishlist = await getWishlistRepository()

      return wishlist
    } else {
      const wishlistItems = cookies.get(WISHLIST_COOKIES_NAME) || []

      if (wishlistItems.length > 0) {
        const { products } = await getProductsByIdsRepository(wishlistItems)

        return {
          items: products.map((product) => ({ id: product.id, product })),
        }
      }

      return {
        items: [],
      }
    }
  }
}
