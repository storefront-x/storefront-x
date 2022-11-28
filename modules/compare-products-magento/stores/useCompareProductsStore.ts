import { defineStore } from 'pinia'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'

export default defineStore('compareProducts', {
  state: () => ({
    items: [] as ReturnType<typeof ToWishlistItem>[],
  }),
})
