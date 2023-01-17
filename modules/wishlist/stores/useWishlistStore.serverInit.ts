import WISHLIST_COOKIES_NAME from '#ioc/config/WISHLIST_COOKIES_NAME'
import useCookies from '#ioc/composables/useCookies'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useMergeWishlist from '#ioc/services/useMergeWishlist'
import useGetWishlistRepository from '#ioc/repositories/useGetWishlistRepository'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'
import useWishlistStore from '#ioc/stores/useWishlistStore'

export default () => {
  const wishlistStore = useWishlistStore()
  const cookies = useCookies()
  const customerStore = useCustomerStore()
  const getWishlistRepository = useGetWishlistRepository()
  const mergeWislist = useMergeWishlist()

  return async () => {
    await waitForStore(
      customerStore,
      () => customerStore.customer !== undefined,
      async () => {
        const localWishlist = cookies.get(WISHLIST_COOKIES_NAME) || []
        wishlistStore.$patch({ anonymousWishlist: localWishlist })

        if (customerStore.customer) {
          const { items } = await getWishlistRepository()
          if (wishlistStore.anonymousWishlist.length) {
            await mergeWislist()
          }

          wishlistStore.items.push(...items)

          cookies.remove(WISHLIST_COOKIES_NAME)
        }
        wishlistStore.items.push(...wishlistStore.anonymousWishlist)
        wishlistStore.anonymousWishlist = []
      },
    )
  }
}
