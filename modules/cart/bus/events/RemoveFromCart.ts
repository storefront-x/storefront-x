import useCartItem from '#ioc/composables/useCartItem'

export default interface RemoveFromCart {
  cartItem: ReturnType<typeof useCartItem>
}
