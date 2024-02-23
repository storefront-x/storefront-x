import defineStore from '#ioc/utils/vuePinia/defineStore'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'
import useProduct from '#ioc/composables/useProduct'
import { ref } from 'vue'
import useAddToWishlistRepository from '#ioc/repositories/useAddToWishlistRepository'
import useRemoveFromWishlistRepository from '#ioc/repositories/useRemoveFromWishlistRepository'
import useWishlistStore from '#ioc/stores/useWishlistStore'
import useCustomer from '#ioc/composables/useCustomer'
import useCookies from '#ioc/composables/useCookies'
import WISHLIST_COOKIES_NAME from '#ioc/config/WISHLIST_COOKIES_NAME'

export default defineStore('wishlistMagento', () => {
  const wishlistStore = useWishlistStore()
  const cookies = useCookies()
  const customer = useCustomer()
  const addToWishlistRepository = useAddToWishlistRepository()
  const removeFromWishlistRepository = useRemoveFromWishlistRepository()

  const wishlistId = ref('')
  const items = ref([] as ReturnType<typeof ToWishlistItem>[])

  const addToWishlist = async (product: ReturnType<typeof useProduct>) => {
    wishlistStore.items.push(product.sku)
    if (customer.isLoggedIn) {
      const newWishlistItems = await addToWishlistRepository(product.sku)
      items.value = newWishlistItems
    } else {
      cookies.set(WISHLIST_COOKIES_NAME, wishlistStore.items, { path: '/' })
    }
  }

  const removeFromWishlist = async (product: ReturnType<typeof useProduct>) => {
    const removeIndex = wishlistStore.items.indexOf(product.id)

    wishlistStore.items.splice(removeIndex, 1)

    if (customer.isLoggedIn) {
      await removeFromWishlistRepository(product.id)
    } else if (wishlistStore.items.length) {
      cookies.set(WISHLIST_COOKIES_NAME, wishlistStore.items, { path: '/' })
    } else {
      cookies.remove(WISHLIST_COOKIES_NAME)
    }

    const wishlistItemToBeRemoved = items.value.find((item) => item.product.sku === product.sku)

    if (!wishlistItemToBeRemoved) {
      return
    }
    const newWishlistItems = await removeFromWishlistRepository(wishlistItemToBeRemoved.id)
    items.value = newWishlistItems
  }

  return { wishlistId, items, addToWishlist, removeFromWishlist }
})
