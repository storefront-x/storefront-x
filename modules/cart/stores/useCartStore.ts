import ToCart from '#ioc/mappers/ToCart'
import { defineStore } from 'pinia'

export default defineStore('cart', {
  state: () => ({
    isMiniCartVisible: false,
    cart: undefined as ReturnType<typeof ToCart> | undefined | null,
  }),
})
