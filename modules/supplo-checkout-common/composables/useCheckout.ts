import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import { computed, reactive } from 'vue'

export default () => {
  const checkoutStore = useCheckoutStore()

  const isDeliveryDateSelected = true

  const customerPricesValid = true

  const loadingPrepareCheckout = computed(() => checkoutStore.loadingPrepareCheckout)

  return reactive({ customerPricesValid, isDeliveryDateSelected, loadingPrepareCheckout })
}
