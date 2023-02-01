import useCartToken from '#ioc/composables/useCartToken'
import useCreateEmptyCartRepository from '#ioc/repositories/useCreateEmptyCartRepository'

export default () => {
  const createEmptyCartRepository = useCreateEmptyCartRepository()
  const cartToken = useCartToken()

  return async (): Promise<{
    id: string
  }> => {
    const id = cartToken.get()

    if (id) {
      return {
        id,
      }
    } else {
      const { id } = await createEmptyCartRepository()

      cartToken.set(id)

      return {
        id,
      }
    }
  }
}
