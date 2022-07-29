import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import { computed, reactive } from 'vue'

export default () => {
  const checkoutStore = useCheckoutStore()

  const shippingMethods = computed(() => checkoutStore.shippingMethods)

  const currentShippingMethod = computed(() => checkoutStore.currentShippingMethod)

  return reactive({
    shippingMethods,
    currentShippingMethod,
  })
}
