import ToCheckoutAgreement from '#ioc/mappers/ToCheckoutAgreement'
import ToContactInformation from '#ioc/mappers/ToContactInformation'
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'
import ToPaymentAddress from '#ioc/mappers/ToPaymentAddress'
import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'
import ToShippingAddress from '#ioc/mappers/ToShippingAddress'
import ToShippingMethod from '#ioc/mappers/ToShippingMethod'
import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('checkout', {
  state: () => ({
    contactInformation: null as ReturnType<typeof ToContactInformation> | null,
    paymentMethods: [] as ReturnType<typeof ToPaymentMethod>[],
    shippingMethods: [] as ReturnType<typeof ToShippingMethod>[],
    paymentMethod: null as ReturnType<typeof ToPaymentMethod> | null,
    shippingMethod: null as ReturnType<typeof ToShippingMethod> | null,
    paymentAddress: null as ReturnType<typeof ToPaymentAddress> | null,
    shippingAddress: null as ReturnType<typeof ToShippingAddress> | null,
    paymentHandler: null as (() => Promise<void>) | null,
    shippingHandler: null as (() => Promise<void>) | null,
    agreements: [] as ReturnType<typeof ToCheckoutAgreement>[],
    customerAddresses: [] as ReturnType<typeof ToCustomerAddress>[],
  }),
})
