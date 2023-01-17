import useCart from '#ioc/composables/useCart'
import useShipping from '#ioc/composables/useShipping'

export default interface Purchase {
  cart: ReturnType<typeof useCart>
  shipping: ReturnType<typeof useShipping>
  order: {
    orderNumber: string
  }
}
