import IS_CLIENT from '#ioc/config/IS_CLIENT'
import { defineStore } from 'pinia'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetCustomer from '#ioc/services/useGetCustomer'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import useCookies from '#ioc/composables/useCookies'

export default defineStore('customerMagento', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const cookies = useCookies()

      const token = cookies.get(MAGENTO_CUSTOMER_COOKIE_NAME)

      if (!token) return

      const customerStore = useCustomerStore()

      const getCustomer = useGetCustomer()

      const { customer } = await getCustomer()

      customerStore.$patch({ customer })
    },
  },
})
