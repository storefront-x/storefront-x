import { provide } from 'vue'
import useGetCustomerOrders from '#ioc/composables/useCustomerOrder'

export default (...args: Parameters<typeof useGetCustomerOrders>) =>
  provide('$CustomerOrder', useGetCustomerOrders(...args))
