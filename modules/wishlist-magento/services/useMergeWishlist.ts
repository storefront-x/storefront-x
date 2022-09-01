import useCookies from '#ioc/composables/useCookies'
import useCustomer from '#ioc/composables/useCustomer'
import WISHLIST_COOKIES_NAME from '#ioc/config/WISHLIST_COOKIES_NAME'
import useMergeWishlistRepository from '#ioc/repositories/useMergeWishlistRepository'
import useGetProductsByIdsRepository from '#ioc/repositories/useGetProductsByIdsRepository'
import useGetWishlist from '#ioc/services/useGetWishlist'

export default () => {
  const cookies = useCookies()
  const customer = useCustomer()
  const getWishlist = useGetWishlist()
  const mergeWishlistRepository = useMergeWishlistRepository()
  const getProductsByIdsRepository = useGetProductsByIdsRepository()

  return async () => {
    if (!customer.isLoggedIn) return

    const wishlist = await getWishlist()

    const wishlistItems = cookies.get(WISHLIST_COOKIES_NAME) || []

    if (wishlistItems.length > 0) {
      const { products } = await getProductsByIdsRepository(wishlistItems)

      const items = products.map((item) => {
        return { sku: item.sku, quantity: 1 }
      })

      // @ts-ignore
      await mergeWishlistRepository(items, wishlist.id)
    }

    cookies.remove(WISHLIST_COOKIES_NAME)
  }
}
