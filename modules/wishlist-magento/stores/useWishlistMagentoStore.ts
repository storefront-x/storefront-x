import IS_CLIENT from '#ioc/config/IS_CLIENT'
import { defineStore } from 'pinia'
import useWishlistStore from '#ioc/stores/useWishlistStore'
import useGetWishlist from '#ioc/services/useGetWishlist'

export default defineStore('wishlistMagento', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const wishlistStore = useWishlistStore()
      const getWishlist = useGetWishlist()

      const { items } = await getWishlist()

      wishlistStore.$patch({ items })
    },
  },
})
