import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import once from '#ioc/utils/once'
import { computed, reactive } from 'vue'
import _paymentMethods from '~/.sfx/paymentMethods'

export default () => {
  const checkoutStore = useCheckoutStore()

  const paymentMethods = computed(() => {
    const codes = Object.keys(_paymentMethods)

    return checkoutStore.paymentMethods.filter((paymentMethod) => {
      if (codes.includes(paymentMethod.code)) {
        return true
      } else {
        once(`Payment method "${paymentMethod.code}" does not have associated component`, console.warn)
      }
    })
  })

  const currentPaymentMethod = computed(() => checkoutStore.currentPaymentMethod)

  return reactive({
    paymentMethods,
    currentPaymentMethod,
  })
}
