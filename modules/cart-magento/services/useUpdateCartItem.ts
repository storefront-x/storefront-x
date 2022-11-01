import useCartItem from '#ioc/composables/useCartItem'
import useUpdateCartItemRepository from '#ioc/repositories/useUpdateCartItemRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'
import UpdateCartItemOptions from '#ioc/types/cart-magento/UpdateCartItemOptions'

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const updateCartitemRepository = useUpdateCartItemRepository()

  return async (cartItem: ReturnType<typeof useCartItem>, options: UpdateCartItemOptions) => {
    const { id } = await getOrCreateCartId()

    const response = await updateCartitemRepository(id, cartItem, options)

    cartStore.$patch(response)
  }
}
