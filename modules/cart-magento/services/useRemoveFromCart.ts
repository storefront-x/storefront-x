import useCartItem from '#ioc/composables/useCartItem'
import useRemoveFromCartRepository from '#ioc/repositories/useRemoveFromCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const removeFromCartRepository = useRemoveFromCartRepository()

  return async (cartItem: ReturnType<typeof useCartItem>) => {
    const { id } = await getOrCreateCartId()

    const response = await removeFromCartRepository(id, cartItem)

    cartStore.$patch(response)
  }
}
