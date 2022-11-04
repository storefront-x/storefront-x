import IS_CLIENT from '#ioc/config/IS_CLIENT'
import { defineStore } from 'pinia'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetCustomer from '#ioc/services/useGetCustomer'
import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'

export default defineStore('customerMagento', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const cookies = useCookies()
      const customerStore = useCustomerStore()
      const getCustomer = useGetCustomer()

      try {
        const { customer } = await getCustomer()

        customerStore.$patch({ customer })
      } catch (e: any) {
        cookies.remove(MAGENTO_CUSTOMER_COOKIE_NAME)
        customerStore.$patch({ customer: null })
      }
    },
  },
})
