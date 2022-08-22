import useGetCheckoutRepository from '#ioc/repositories/useGetCheckoutRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'

export default () => {
  const getOrCreateCartId = useGetOrCreateCartId()
  const getCheckoutRepository = useGetCheckoutRepository()

  return async () => {
    const { id } = await getOrCreateCartId()

    const checkout = await getCheckoutRepository(id)

    return checkout
  }
}
