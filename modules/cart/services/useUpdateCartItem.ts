import useCartStore from '#ioc/stores/useCartStore'
import useUpdateCartItemRepository from '#ioc/repositories/useUpdateCartItemRepository'

export default () => {
  const cartStore = useCartStore()
  const updateCartItemRepository = useUpdateCartItemRepository()

  return async (...args: Parameters<typeof updateCartItemRepository>) => {
    const response = await updateCartItemRepository(...args)

    cartStore.$patch(response)
  }
}
