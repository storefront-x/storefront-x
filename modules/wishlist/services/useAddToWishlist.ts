import useCookies from '#ioc/composables/useCookies'
import useCustomer from '#ioc/composables/useCustomer'
import useProduct from '#ioc/composables/useProduct'
import WISHLIST_COOKIES_NAME from '#ioc/config/WISHLIST_COOKIES_NAME'
import useWishlistStore from '#ioc/stores/useWishlistStore'
import useAddToWishlistRepository from '#ioc/repositories/useAddToWishlistRepository'

export default () => {
  const wishlistStore = useWishlistStore()
  const cookies = useCookies()
  const customer = useCustomer()
  const addToWishlistRepository = useAddToWishlistRepository()

  return async (product: ReturnType<typeof useProduct>) => {
    const items = [...wishlistStore.items, { id: product.id, product }]
    const productIds = items.map((item) => item.product.id)

    if (customer.isLoggedIn) {
      await addToWishlistRepository(product)
    } else {
      cookies.set(WISHLIST_COOKIES_NAME, productIds, { path: '/' })
    }

    wishlistStore.$patch({ items })
  }
}
