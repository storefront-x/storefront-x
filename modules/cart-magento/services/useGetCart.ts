import useToCart from '#ioc/mappers/useToCart'
import useGetCartByIdRepository from '../repositories/useGetCartByIdRepository'
import useGetOrCreateCartId from './useGetOrCreateCartId'

export default () => {
  const getOrCreateCartId = useGetOrCreateCartId()
  const getCartByIdRepository = useGetCartByIdRepository()

  return async (): Promise<{
    cart: ReturnType<ReturnType<typeof useToCart>>
  }> => {
    const { id } = await getOrCreateCartId()

    const { cart } = await getCartByIdRepository(id)

    return {
      cart,
    }
  }
}
