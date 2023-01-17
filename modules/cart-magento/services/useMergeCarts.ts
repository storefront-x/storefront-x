import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import useGetCustomerCartId from '#ioc/repositories/useGetCustomerCartIdRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useMergeCartsRepository from '#ioc/repositories/useMergeCartsRepository'
import useCartStore from '#ioc/stores/useCartStore'
import useCartTokenIdent from '#ioc/composables/useCartTokenIdent'

export default () => {
  const cartMagentoStore = useCartMagentoStore()
  const getCustomerCartId = useGetCustomerCartId()
  const getOrCreateCartId = useGetOrCreateCartId()
  const mergeCarts = useMergeCartsRepository()
  const cartStore = useCartStore()
  const cartTokenIdent = useCartTokenIdent()

  return async () => {
    try {
      const { id: sourceCartId } = await getOrCreateCartId()
      const { id: destinationCartId } = await getCustomerCartId()

      if (sourceCartId === destinationCartId) return

      const { cart } = await mergeCarts(sourceCartId, destinationCartId)
      cartStore.$patch({ cart })

      localStorage.setItem(cartTokenIdent, destinationCartId)
      cartMagentoStore.$patch({ cartId: destinationCartId })
    } catch (error) {
      cartMagentoStore.$patch({ cartId: null })
      localStorage.removeItem(cartTokenIdent)
      console.warn(error)
    }
  }
}
