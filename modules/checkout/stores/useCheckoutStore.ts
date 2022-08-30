import useToCheckoutAgreement from '#ioc/mappers/useToCheckoutAgreement'
import useToContactInformation from '#ioc/mappers/useToContactInformation'
import useToPaymentAddress from '#ioc/mappers/useToPaymentAddress'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'
import useToShippingAddress from '#ioc/mappers/useToShippingAddress'
import useToShippingMethod from '#ioc/mappers/useToShippingMethod'
import { defineStore } from 'pinia'

export default defineStore('checkout', {
  state: () => ({
    contactInformation: null as ReturnType<ReturnType<typeof useToContactInformation>> | null,
    paymentMethods: [] as ReturnType<ReturnType<typeof useToPaymentMethod>>[],
    shippingMethods: [] as ReturnType<ReturnType<typeof useToShippingMethod>>[],
    paymentMethod: null as ReturnType<ReturnType<typeof useToPaymentMethod>> | null,
    shippingMethod: null as ReturnType<ReturnType<typeof useToShippingMethod>> | null,
    paymentAddress: null as ReturnType<ReturnType<typeof useToPaymentAddress>> | null,
    shippingAddress: null as ReturnType<ReturnType<typeof useToShippingAddress>> | null,
    paymentHandler: null as (() => Promise<void>) | null,
    shippingHandler: null as (() => Promise<void>) | null,
    agreements: [] as ReturnType<ReturnType<typeof useToCheckoutAgreement>>[],
  }),
})
