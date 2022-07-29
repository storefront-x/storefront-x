import useCookies from '#ioc/composables/useCookies'
import useCustomer from '#ioc/composables/useCustomer'
import useProduct from '#ioc/composables/useProduct'
import WISHLIST_COOKIES_NAME from '#ioc/config/WISHLIST_COOKIES_NAME'
import useToWishlistItem from '#ioc/mappers/useToWishlistItem'
import useWishlistStore from '#ioc/stores/useWishlistStore'
import useAddToWishlistRepository from '#ioc/repositories/useAddToWishlistRepository'

export default () => {
  const wishlistStore = useWishlistStore()
  const cookies = useCookies()
  const customer = useCustomer()
  const addToWishlistRepository = useAddToWishlistRepository()
  const toWishlistItem = useToWishlistItem()

  return async (product: ReturnType<typeof useProduct>) => {
    const newWishlistItem = toWishlistItem({
      id: product.id,
      product,
    })

    const newWishlistItems = [...wishlistStore.items, newWishlistItem]
    const newWishlistItemIds = newWishlistItems.map((item) => item.id)

    if (customer.isLoggedIn) {
      await addToWishlistRepository(product)
    } else {
      cookies.set(WISHLIST_COOKIES_NAME, newWishlistItemIds, { path: '/' })
    }

    wishlistStore.$patch({ items: newWishlistItems })
  }
}
