import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import usePlaceOrderRepository from '#ioc/repositories/usePlaceOrderRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import { onUnmounted, ref } from 'vue'

export default () => {
  const cookies = useCookies()
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const placeOrderRepository = usePlaceOrderRepository()
  const cartMagentoStore = useCartMagentoStore()

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

    cookies.remove(MAGENTO_CART_COOKIE_NAME)

    isOrderPlaced.value = true

    return {
      order,
    }
  }
}
