import useCookies from '#ioc/composables/useCookies'
import useProduct from '#ioc/composables/useProduct'
import useWishlistStore from '#ioc/stores/useWishlistStore'
import WISHLIST_COOKIES_NAME from '#ioc/config/WISHLIST_COOKIES_NAME'
import useCustomer from '#ioc/composables/useCustomer'
import useRemoveFromWishlistRepository from '#ioc/repositories/useRemoveFromWishlistRepository'

export default () => {
  const wishlistStore = useWishlistStore()
  const cookies = useCookies()
  const customer = useCustomer()
  const removeFromWishlistRepository = useRemoveFromWishlistRepository()

  return async (product: ReturnType<typeof useProduct>) => {
    if (customer.isLoggedIn) {
      await removeFromWishlistRepository(product)
    }

    const newWishlistItems = wishlistStore.items.filter((item) => item.product.id !== product.id)

    wishlistStore.$patch({ items: newWishlistItems })

    if (!customer.isLoggedIn) {
      const newWishlistItemsIds = newWishlistItems.map((item) => item.product.id)

      cookies.set(WISHLIST_COOKIES_NAME, newWishlistItemsIds, { path: '/' })
    }
  }
}
