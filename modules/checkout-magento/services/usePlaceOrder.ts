import usePlaceOrderRepository from '#ioc/repositories/usePlaceOrderRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import useCartTokenIdent from '#ioc/composables/useCartTokenIdent'
import { onUnmounted, ref } from 'vue'

export default () => {
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const placeOrderRepository = usePlaceOrderRepository()
  const cartMagentoStore = useCartMagentoStore()
  const cartTokenIdent = useCartTokenIdent()

  const isOrderPlaced = ref(false)

  onUnmounted(() => {
    if (isOrderPlaced.value) {
      cartStore.$reset()
      checkoutStore.$reset()
      cartMagentoStore.$reset()
    }
  })

  return async () => {
    const { id } = await getOrCreateCartId()

    const { order } = await placeOrderRepository(id)

    localStorage.removeItem(cartTokenIdent)

    isOrderPlaced.value = true

    return {
      order,
    }
  }
}
