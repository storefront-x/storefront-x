import ToCart from '#ioc/mappers/ToCart'
import useGetCartByIdRepository from '#ioc/repositories/useGetCartByIdRepository'
import useGetCartId from '#ioc/services/useGetCartId'

export default () => {
  const getCartId = useGetCartId()
  const getCartByIdRepository = useGetCartByIdRepository()

  return async (): Promise<{
    cart: ReturnType<typeof ToCart> | null
  }> => {
    const { id } = await getCartId()

    if (!id) {
      return {
        cart: null,
      }
    }

    const { cart } = await getCartByIdRepository(id)

    return {
      cart,
    }
  }
}
