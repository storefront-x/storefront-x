import { computed, reactive } from 'vue'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import ToContactInformation from '#ioc/mappers/ToContactInformation'
import useCart from '#ioc/composables/useCart'

export default () => {
  const checkoutStore = useCheckoutStore()
  const cart = useCart()

  const contactInformation = computed(() => checkoutStore.contactInformation)

  const agreements = computed(() => checkoutStore.agreements)

  const paymentHandler = computed(() => checkoutStore.paymentHandler)

  const shippingHandler = computed(() => checkoutStore.shippingHandler)

  const grandTotal = computed(() => cart.grandTotal)

  const shippingMethod = computed(() => checkoutStore.shippingMethod)

  const setContactInformation = (contactInformation: ReturnType<typeof ToContactInformation>) => {
    checkoutStore.$patch({ contactInformation })
  }

  return reactive({
    contactInformation,
    agreements,
    paymentHandler,
    shippingHandler,
    grandTotal,
    shippingMethod,
    setContactInformation,
  })
}
