import ToShippingMethod from '#ioc/mappers/ToShippingMethod'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import once from '#ioc/utils/once'
import { computed, reactive } from 'vue'
import _shippingMethods from '~/.sfx/shippingMethods'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useSetShippingMethodOnCart from '#ioc/services/useSetShippingMethodOnCart'

export default () => {
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setShippingMethodOnCart = useSetShippingMethodOnCart()

  const shippingMethods = computed(() => {
    const codes = Object.keys(_shippingMethods)

    return checkoutStore.shippingMethods.filter((shippingMethod) => {
      if (codes.includes(shippingMethod.code)) {
        return true
      } else {
        once(`Shipping method "${shippingMethod.code}" does not have associated component`, console.warn)
      }
    })
  })

  const shippingMethod = computed(() => checkoutStore.shippingMethod)

  const shippingAddress = computed(() => checkoutStore.shippingAddress)

  const shippingHandler = computed(() => checkoutStore.shippingHandler)

  const setShippingMethod = async (shippingMethod: ReturnType<typeof ToShippingMethod>) => {
    const { id } = await getOrCreateCartId()

    const { checkout } = await setShippingMethodOnCart(id, shippingMethod)

    checkoutStore.$patch({ ...checkout, shippingMethod })
  }

  const setShippingHandler = (shippingHandler: () => Promise<void>) => {
    checkoutStore.$patch({ shippingHandler })
  }

  return reactive({
    shippingMethods,
    shippingMethod,
    shippingAddress,
    setShippingMethod,
    setShippingHandler,
    shippingHandler,
  })
}
