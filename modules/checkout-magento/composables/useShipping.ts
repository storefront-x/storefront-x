import useToShippingMethod from '#ioc/mappers/useToShippingMethod'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import once from '#ioc/utils/once'
import { computed, reactive } from 'vue'
import _shippingMethods from '~/.sfx/shippingMethods'

export default () => {
  const checkoutStore = useCheckoutStore()

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

  const setShippingMethod = (shippingMethod: ReturnType<ReturnType<typeof useToShippingMethod>>) => {
    checkoutStore.$patch({ shippingMethod })
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
