import useGetCustomerCartIdRepository from '#ioc/repositories/useGetCustomerCartIdRepository'
import useCartStore from '#ioc/stores/useCartStore'

export default () => {
  const cartStore = useCartStore()
  const getCustomerCartIdRepository = useGetCustomerCartIdRepository()

  return async () => {
    if (cartStore.cart?.id) {
      return {
        id: cartStore.cart.id,
      }
    }

    const { id } = await getCustomerCartIdRepository()

    return {
      id,
    }
  }
}
