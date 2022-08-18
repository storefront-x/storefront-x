import useToCart from '#ioc/mappers/useToCart'
import { defineStore } from 'pinia'

export default defineStore('cart', {
  state: () => ({
    cart: undefined as ReturnType<ReturnType<typeof useToCart>> | undefined | null,
  }),
})
