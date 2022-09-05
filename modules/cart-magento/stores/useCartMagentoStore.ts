import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCartStore from '#ioc/stores/useCartStore'
import useGetCart from '#ioc/services/useGetCart'
import { defineStore } from 'pinia'
import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'

export default defineStore('cartMagento', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const cartStore = useCartStore()
      const getCart = useGetCart()
      const cookies = useCookies()

      try {
        const cart = await getCart()

        cartStore.$patch(cart)
      } catch (e) {
        cookies.remove(MAGENTO_CART_COOKIE_NAME, { path: '/' })
      }
    },
  },
})
