import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCartStore from '#ioc/stores/useCartStore'
import useGetCart from '#ioc/services/useGetCart'
import { defineStore } from 'pinia'
import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'

export default defineStore('cartMagento', {
  state: () => ({
    cartId: '',
  }),

  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const cookies = useCookies()
      const cartStore = useCartStore()

      const id = cookies.get(MAGENTO_CART_COOKIE_NAME)

      this.$patch({ cartId: id })

      const getCart = useGetCart()

      const cart = await getCart()

      cartStore.$patch(cart)
    },
  },
})
