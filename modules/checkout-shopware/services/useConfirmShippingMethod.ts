import ToShippingMethod from '#ioc/mappers/ToShippingMethod'
import useGetCartRepository from '#ioc/repositories/useGetCartRepository'
import useSetCurrentShippingMethodRepository from '#ioc/repositories/useSetCurrentShippingMethodRepository'
import useCartStore from '#ioc/stores/useCartStore'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const setCurrentShippingMethodRepository = useSetCurrentShippingMethodRepository()
  const getCatCartRepository = useGetCartRepository()

  return async (shippingMethod: ReturnType<typeof ToShippingMethod>) => {
    await setCurrentShippingMethodRepository(shippingMethod)
    const { cart } = await getCatCartRepository()

    checkoutStore.$patch({ shippingMethod: shippingMethod })
    cartStore.$patch({ cart })
  }
}
