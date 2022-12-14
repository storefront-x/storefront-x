import ToCart from '#ioc/mappers/ToCart'
import useGetCartByIdRepository from '#ioc/repositories/useGetCartByIdRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'

export default () => {
  const getOrCreateCartId = useGetOrCreateCartId()
  const getCartByIdRepository = useGetCartByIdRepository()

  return async (): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const { id } = await getOrCreateCartId()

    const { cart } = await getCartByIdRepository(id)

    return {
      cart,
    }
  }
}
