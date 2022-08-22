import { defineStore } from 'pinia'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetWishlist from '#ioc/services/useGetWishlist'
import useMergeWishlist from '#ioc/services/useMergeWishlist'
import useToWishlistItem from '#ioc/mappers/useToWishlistItem'

export default defineStore('wishlist', {
  state: () => ({
    items: [] as ReturnType<ReturnType<typeof useToWishlistItem>>[],
  }),

  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const customerStore = useCustomerStore()
      const getWishlist = useGetWishlist()
      const mergeWishlist = useMergeWishlist()

      return new Promise<void>((resolve) => {
        customerStore.$subscribe(async (_, state) => {
          try {
            if (!state?.customer) return

            await mergeWishlist()

            const wishlist = await getWishlist()

            if (!wishlist) return

            this.$patch(wishlist)

            resolve()
          } catch (e) {
            console.error(e)
          }
        })
      })
    },
  },
})
