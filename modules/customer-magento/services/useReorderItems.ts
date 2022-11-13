import useReorderItemsRepository from '#ioc/repositories/useReorderItemsRepository'
import useCartStore from '#ioc/stores/useCartStore'
export default () => {
  const reorderItemsRepository = useReorderItemsRepository()
  const cartStore = useCartStore()

  return async (orderId: string) => {
    console.log('order id service', orderId)
    try {
      const { cart } = await reorderItemsRepository(orderId)
      cartStore.$patch({ cart })
    } catch (error) {
      console.warn(error)
    }
  }
}
