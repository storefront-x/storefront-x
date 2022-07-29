import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCartStore from '#ioc/stores/useCartStore'
import useGetCart from '#ioc/services/useGetCart'
import { defineStore } from 'pinia'

export default defineStore('cartShopware', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const cartStore = useCartStore()
      const getCart = useGetCart()

      const cart = await getCart()

      cartStore.$patch(cart)
    },
  },
})
