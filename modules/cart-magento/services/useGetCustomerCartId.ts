import useGetCustomerCartIdRepository from '#ioc/repositories/useGetCustomerCartIdRepository'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'

export default () => {
  const getCustomerCartIdRepository = useGetCustomerCartIdRepository()
  const cartMagentoStore = useCartMagentoStore()

  return async () => {
    const cartId = cartMagentoStore.cartId
    if (cartId) return { cartId }

    const { id } = await getCustomerCartIdRepository()

    return { id }
  }
}
