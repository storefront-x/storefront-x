import { defineStore } from 'pinia'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import WISHLIST_COOKIES_NAME from '#ioc/config/WISHLIST_COOKIES_NAME'
import useCookies from '#ioc/composables/useCookies'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useMergeWishlist from '#ioc/services/useMergeWishlist'
import useGetWishlistRepository from '#ioc/repositories/useGetWishlistRepository'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'
import waitForStore from '#ioc/utils/vue-pinia/waitForStore'
export default defineStore('wishlist', {
  state: () => ({
    items: [] as ReturnType<typeof ToWishlistItem>[],
    anonymousWishlist: [] as ReturnType<typeof ToWishlistItem>,
  }),

  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const cookies = useCookies()
      const customerStore = useCustomerStore()

      const getWishlistRepository = useGetWishlistRepository()
      const mergeWislist = useMergeWishlist()

      await waitForStore(
        customerStore,
        () => customerStore.customer !== undefined,
        async () => {
          const localWishlist = cookies.get(WISHLIST_COOKIES_NAME) || []
          this.$patch({ anonymousWishlist: localWishlist })

          if (customerStore.customer) {
            const { items } = await getWishlistRepository()

            await mergeWislist()

            this.items.push(...items)

            cookies.remove(WISHLIST_COOKIES_NAME)
          }
          this.items.push(...this.anonymousWishlist)
          this.anonymousWishlist = []
        },
      )
    },
  },
})
