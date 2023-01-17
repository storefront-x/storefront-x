import useCartTokenIdent from '#ioc/composables/useCartTokenIdent'
import useCreateEmptyCartRepository from '#ioc/repositories/useCreateEmptyCartRepository'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'

export default () => {
  const createEmptyCartRepository = useCreateEmptyCartRepository()
  const cartMagentoStore = useCartMagentoStore()
  const cartTokenIdent = useCartTokenIdent()

  return async (): Promise<{
    id: string
  }> => {
    const id = cartMagentoStore.cartId
    if (id) return { id }

    {
      const { id } = await createEmptyCartRepository()

      localStorage.setItem(cartTokenIdent, id)

      cartMagentoStore.$patch({ cartId: id })

      return { id }
    }
  }
}
