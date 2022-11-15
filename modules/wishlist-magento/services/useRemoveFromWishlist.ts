import useCookies from '#ioc/composables/useCookies'
import useWishlistStore from '#ioc/stores/useWishlistStore'
import WISHLIST_COOKIES_NAME from '#ioc/config/WISHLIST_COOKIES_NAME'
import useCustomer from '#ioc/composables/useCustomer'
import useRemoveFromWishlistRepository from '#ioc/repositories/useRemoveFromWishlistRepository'
import useProduct from '#ioc/composables/useProduct'

export default () => {
  const wishlistStore = useWishlistStore()
  const cookies = useCookies()
  const customer = useCustomer()
  const removeFromWishlistRepository = useRemoveFromWishlistRepository()

  return async (product: ReturnType<typeof useProduct>) => {
    const removeIndex = wishlistStore.items.indexOf(product.sku)

    wishlistStore.items.splice(removeIndex, 1)

    if (customer.isLoggedIn) {
      await removeFromWishlistRepository(product.sku)
    } else if (wishlistStore.items.length) {
      cookies.set(WISHLIST_COOKIES_NAME, wishlistStore.items, { path: '/' })
    } else {
      cookies.remove(WISHLIST_COOKIES_NAME)
    }
  }
}
