import useCookies from '#ioc/composables/useCookies'
import useCustomer from '#ioc/composables/useCustomer'
import useMergeWishlistRepository from '#ioc/repositories/useMergeWishlistRepository'
import WISHLIST_COOKIES_NAME from '#ioc/config/WISHLIST_COOKIES_NAME'

export default () => {
  const cookies = useCookies()
  const customer = useCustomer()
  const mergeWishlistRepository = useMergeWishlistRepository()

  return async () => {
    if (!customer.isLoggedIn) return

    const wishlistItems = cookies.get(WISHLIST_COOKIES_NAME) || []

    if (wishlistItems.length === 0) return

    await mergeWishlistRepository(wishlistItems)

    cookies.remove(WISHLIST_COOKIES_NAME)
  }
}
