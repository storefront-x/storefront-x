import { defineStore } from 'pinia'
import useToWishlistItem from '#ioc/mappers/useToWishlistItem'

export default defineStore('wishlist', {
  state: () => ({
    items: [] as ReturnType<ReturnType<typeof useToWishlistItem>>[],
  }),
})
