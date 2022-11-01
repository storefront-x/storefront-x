import { defineStore } from 'pinia'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetWishlist from '#ioc/services/useGetWishlist'
import useMergeWishlist from '#ioc/services/useMergeWishlist'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'
import waitForStore from '#ioc/utils/vue-pinia/waitForStore'

export default defineStore('wishlist', {
  state: () => ({
    items: [] as ReturnType<typeof ToWishlistItem>[],
  }),

  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const customerStore = useCustomerStore()
      const getWishlist = useGetWishlist()
      const mergeWishlist = useMergeWishlist()
      return async () => {
        return await waitForStore(
          customerStore,
          () => customerStore.customer !== undefined,
          async () => {
            if (customerStore.customer) {
              await mergeWishlist()
              const wishlist = await getWishlist()

              this.$patch(wishlist)
            }
          },
        )
      }
    },
  },
})
