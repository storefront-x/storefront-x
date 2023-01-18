import defineStore from '#ioc/utils/vuePinia/defineStore'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'

export default defineStore('wishlist', {
  state: () => ({
    items: [] as ReturnType<typeof ToWishlistItem>[],
    anonymousWishlist: [] as ReturnType<typeof ToWishlistItem>,
  }),
})
