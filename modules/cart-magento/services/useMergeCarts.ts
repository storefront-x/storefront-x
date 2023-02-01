import useGetCustomerCartId from '#ioc/repositories/useGetCustomerCartIdRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useMergeCartsRepository from '#ioc/repositories/useMergeCartsRepository'
import useCartStore from '#ioc/stores/useCartStore'
import useCartToken from '#ioc/composables/useCartToken'

export default () => {
  const getCustomerCartId = useGetCustomerCartId()
  const getOrCreateCartId = useGetOrCreateCartId()
  const mergeCarts = useMergeCartsRepository()
  const cartStore = useCartStore()
  const cartToken = useCartToken()

  return async () => {
    try {
      const { id: sourceCartId } = await getOrCreateCartId()
      const { id: destinationCartId } = await getCustomerCartId()

      if (sourceCartId === destinationCartId) return

      const { cart } = await mergeCarts(sourceCartId, destinationCartId)
      cartStore.$patch({ cart })

      cartToken.set(destinationCartId)
    } catch (error) {
      cartToken.remove()
      console.warn(error)
    }
  }
}
