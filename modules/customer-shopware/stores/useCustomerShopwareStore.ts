import IS_CLIENT from '#ioc/config/IS_CLIENT'
import defineStore from '#ioc/utils/vuePinia/defineStore'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetCustomer from '#ioc/services/useGetCustomer'

export default defineStore('customerShopware', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const customerStore = useCustomerStore()
      const getCustomer = useGetCustomer()

      const { customer } = await getCustomer()

      customerStore.$patch({ customer })
    },
  },
})
