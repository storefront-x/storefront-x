import useSetShippingMethodOnCartRepository from '#ioc/repositories/useSetShippingMethodOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'
import ToShippingMethod from '#ioc/mappers/ToShippingMethod'

export default () => {
  const getOrCreateCartId = useGetOrCreateCartId()
  const setShippingMethodOnCartRepository = useSetShippingMethodOnCartRepository()
  const cartStore = useCartStore()

  return async (shippingMethod: ReturnType<typeof ToShippingMethod>) => {
    const { id } = await getOrCreateCartId()

    const { cart } = await setShippingMethodOnCartRepository(id, shippingMethod)

    cartStore.$patch({ cart })
  }
}
