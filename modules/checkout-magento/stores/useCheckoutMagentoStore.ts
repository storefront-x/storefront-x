import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useGetCheckout from '#ioc/services/useGetCheckout'
import { defineStore } from 'pinia'

export default defineStore('checkoutShopware', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const checkoutStore = useCheckoutStore()
      const getCheckout = useGetCheckout()

      const checkout = await getCheckout()

      checkoutStore.$patch(checkout)
    },
  },
})
