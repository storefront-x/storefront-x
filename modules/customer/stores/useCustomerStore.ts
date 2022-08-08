import useToCustomer from '#ioc/mappers/useToCustomer'
import { defineStore } from 'pinia'

export default defineStore('customer', {
  state: () => ({
    customer: undefined as ReturnType<ReturnType<typeof useToCustomer>> | null | undefined,
    token: undefined as string | null | undefined,
  }),
})
