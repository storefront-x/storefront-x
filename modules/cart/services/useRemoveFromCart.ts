import useCartStore from '#ioc/stores/useCartStore'
import useRemoveFromCartRepository from '#ioc/repositories/useRemoveFromCartRepository'

export default () => {
  const cartStore = useCartStore()
  const removeFromCartRepository = useRemoveFromCartRepository()

  return async (...args: Parameters<typeof removeFromCartRepository>) => {
    const response = await removeFromCartRepository(...args)

    cartStore.$patch(response)
  }
}
