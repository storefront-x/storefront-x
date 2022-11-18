import ToCart from '#ioc/mappers/ToCart'
import { defineStore } from 'pinia'

export default defineStore('cart', {
  state: () => ({
    miniCartVisible: false,
    cart: undefined as ReturnType<typeof ToCart> | undefined | null,
  }),
})
