import useCartToken from '#ioc/composables/useCartToken'
import useCreateEmptyCartRepository from '#ioc/repositories/useCreateEmptyCartRepository'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'

export default () => {
  const createEmptyCartRepository = useCreateEmptyCartRepository()
  const cartMagentoStore = useCartMagentoStore()
  const cartToken = useCartToken()

  return async (): Promise<{
    id: string
  }> => {
    const id = cartMagentoStore.cartId
    if (id) return { id }

    {
      const { id } = await createEmptyCartRepository()

      cartToken.set(id)

      cartMagentoStore.$patch({ cartId: id })

      return { id }
    }
  }
}
