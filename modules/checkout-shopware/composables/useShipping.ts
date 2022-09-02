import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import { computed, reactive } from 'vue'

export default () => {
  const checkoutStore = useCheckoutStore()

  const shippingMethods = computed(() => checkoutStore.shippingMethods)

  const shippingMethod = computed(() => checkoutStore.shippingMethod)

  return reactive({
    shippingMethods,
    shippingMethod,
  })
}
