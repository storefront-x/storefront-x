import IS_CLIENT from '#ioc/config/IS_CLIENT'
import defineStore from '#ioc/utils/vuePinia/defineStore'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetCustomer from '#ioc/services/useGetCustomer'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import useCookies from '#ioc/composables/useCookies'

export default defineStore('customerMagento', {
  state: () => ({
    customerId: '',
  }),
  actions: {
    async serverInit() {
      if (IS_CLIENT) return
      const cookies = useCookies()
      const customerStore = useCustomerStore()
      const getCustomer = useGetCustomer()

      const id = cookies.get(MAGENTO_CUSTOMER_COOKIE_NAME)
      this.$patch({ customerId: id })
      if (this.customerId) {
        const { customer } = await getCustomer()
        customerStore.$patch({ customer })
      } else {
        customerStore.$patch({ customer: null })
      }
    },
  },
})
