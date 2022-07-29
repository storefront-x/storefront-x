import IS_CLIENT from '#ioc/config/IS_CLIENT'
import { defineStore } from 'pinia'
import useWishlistStore from '#ioc/stores/useWishlistStore'
import useGetWishlist from '#ioc/services/useGetWishlist'
import useMergeWishlist from '#ioc/services/useMergeWishlist'
import useCustomerStore from '#ioc/stores/useCustomerStore'

export default defineStore('wishlistShopware', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const customerStore = useCustomerStore()
      const wishlistStore = useWishlistStore()
      const getWishlist = useGetWishlist()
      const mergeWishlist = useMergeWishlist()

      return new Promise<void>((resolve) => {
        customerStore.$subscribe(async (_, state) => {
          if (state.customer === undefined) return

          await mergeWishlist()

          const { items } = await getWishlist()

          wishlistStore.$patch({ items })

          resolve()
        })
      })
    },
  },
})
