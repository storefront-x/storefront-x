import { computed, reactive } from 'vue'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useToContactInformation from '#ioc/mappers/useToContactInformation'

export default () => {
  const checkoutStore = useCheckoutStore()

  const contactInformation = computed(() => checkoutStore.contactInformation)

  const agreements = computed(() => checkoutStore.agreements)

  const paymentHandler = computed(() => checkoutStore.paymentHandler)

  const shippingHandler = computed(() => checkoutStore.shippingHandler)

  const setContactInformation = (contactInformation: ReturnType<ReturnType<typeof useToContactInformation>>) => {
    checkoutStore.$patch({ contactInformation })
  }

  return reactive({
    contactInformation,
    agreements,
    paymentHandler,
    shippingHandler,
    setContactInformation,
  })
}
