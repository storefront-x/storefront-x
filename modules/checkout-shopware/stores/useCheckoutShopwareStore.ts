import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useGetCurrentPaymentMethod from '#ioc/services/useGetCurrentPaymentMethod'
import useGetCurrentShippingMethod from '#ioc/services/useGetCurrentShippingMethod'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useGetPaymentMethods from '#ioc/services/useGetPaymentMethods'
import useGetShippingMethods from '#ioc/services/useGetShippingMethods'

import { defineStore } from 'pinia'

export default defineStore('checkoutShopware', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const checkoutStore = useCheckoutStore()
      const getPaymentMethods = useGetPaymentMethods()
      const getShippingMethods = useGetShippingMethods()
      const getCurrentPaymentMethod = useGetCurrentPaymentMethod()
      const getCurrentShippingMethod = useGetCurrentShippingMethod()

      const [{ paymentMethods }, { shippingMethods }, { currentPaymentMethod }, { currentShippingMethod }] =
        await Promise.all([
          getPaymentMethods(),
          getShippingMethods(),
          getCurrentPaymentMethod(),
          getCurrentShippingMethod(),
        ])

      checkoutStore.$patch({
        paymentMethods,
        shippingMethods,
        currentPaymentMethod,
        currentShippingMethod,
      })
    },
  },
})
