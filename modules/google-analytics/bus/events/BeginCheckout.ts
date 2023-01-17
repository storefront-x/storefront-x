import useCart from '#ioc/composables/useCart'

export default interface BeginCheckout {
  cart: ReturnType<typeof useCart>
}
