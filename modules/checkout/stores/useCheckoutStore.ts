import useToContactInformation from '#ioc/mappers/useToContactInformation'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'
import useToShippingMethod from '#ioc/mappers/useToShippingMethod'
import { defineStore } from 'pinia'

export default defineStore('checkout', {
  state: () => ({
    paymentMethods: [] as ReturnType<ReturnType<typeof useToPaymentMethod>>[],
    shippingMethods: [] as ReturnType<ReturnType<typeof useToShippingMethod>>[],
    currentPaymentMethod: null as ReturnType<ReturnType<typeof useToPaymentMethod>> | null,
    currentShippingMethod: null as ReturnType<ReturnType<typeof useToShippingMethod>> | null,
    contactInformation: null as ReturnType<ReturnType<typeof useToContactInformation>> | null,
  }),
})
