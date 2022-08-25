import useGetCheckoutRepository from '#ioc/repositories/useGetCheckoutRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const getCheckoutRepository = useGetCheckoutRepository()

  return async () => {
    const { id } = await getOrCreateCartId()

    const { checkout } = await getCheckoutRepository(id)

    checkoutStore.$patch(checkout)
  }
}
