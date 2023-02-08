import usePlaceOrderRepository from '#ioc/repositories/usePlaceOrderRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useCartToken from '#ioc/composables/useCartToken'
import { onUnmounted, ref } from 'vue'

export default () => {
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const placeOrderRepository = usePlaceOrderRepository()
  const cartToken = useCartToken()

  const isOrderPlaced = ref(false)

  onUnmounted(() => {
    if (isOrderPlaced.value) {
      cartStore.$reset()
      checkoutStore.$reset()
    }
  })

  return async () => {
    const { id } = await getOrCreateCartId()

    const { order } = await placeOrderRepository(id)

    cartToken.remove()

    isOrderPlaced.value = true

    return {
      order,
    }
  }
}
