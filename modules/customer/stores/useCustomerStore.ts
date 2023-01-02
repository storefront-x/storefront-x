import ToCustomer from '#ioc/mappers/ToCustomer'
import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('customer', {
  state: () => ({
    customer: undefined as ReturnType<typeof ToCustomer> | null | undefined,
  }),
})
