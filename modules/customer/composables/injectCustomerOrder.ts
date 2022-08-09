import { inject } from 'vue'
import useGetCustomerOrders from '#ioc/composables/useCustomerOrder'

export default () => inject('$CustomerOrder') as ReturnType<typeof useGetCustomerOrders>
