import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'
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

  const paymentMethod = computed(() => checkoutStore.paymentMethod)

  const paymentHandler = computed(() => checkoutStore.paymentHandler)

  const setPaymentMethod = (paymentMethod: ReturnType<typeof ToPaymentMethod>) => {
    checkoutStore.$patch({ paymentMethod })
  }

  const setPaymentHandler = (paymentHandler: () => Promise<void>) => {
    checkoutStore.$patch({ paymentHandler })
  }

  return reactive({
    paymentMethods,
    paymentMethod,
    setPaymentMethod,
    setPaymentHandler,
    paymentHandler,
  })
}
