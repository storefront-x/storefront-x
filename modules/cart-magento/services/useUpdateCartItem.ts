import useCartItem from '#ioc/composables/useCartItem'
import useUpdateCartItemRepository from '#ioc/repositories/useUpdateCartItemRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'

interface Options {
  quantity?: number
}

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const updateCartitemRepository = useUpdateCartItemRepository()

  return async (cartItem: ReturnType<typeof useCartItem>, options: Options) => {
    const { id } = await getOrCreateCartId()

    const response = await updateCartitemRepository(id, cartItem, options)

    cartStore.$patch(response)
  }
}
