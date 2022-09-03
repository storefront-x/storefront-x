import { defineStore } from 'pinia'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetWishlist from '#ioc/services/useGetWishlist'
import useMergeWishlist from '#ioc/services/useMergeWishlist'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'

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

      return new Promise<void>((resolve) => {
        customerStore.$subscribe(async (_, state) => {
          if (state.customer === undefined) return

          try {
            if (state.customer !== null) await mergeWishlist()
          } catch (e) {
            console.error(e)
          }

          const wishlist = await getWishlist()

          this.$patch(wishlist)

          resolve()
        })
      })
    },
  },
})
