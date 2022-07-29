import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import { computed, reactive } from 'vue'

export default () => {
  const checkoutStore = useCheckoutStore()

  const paymentMethods = computed(() => checkoutStore.paymentMethods)

  const currentPaymentMethod = computed(() => checkoutStore.currentPaymentMethod)

  return reactive({
    paymentMethods,
    currentPaymentMethod,
  })
}
