import useToShippingMethod from '#ioc/mappers/useToShippingMethod'
import useGetCartRepository from '#ioc/repositories/useGetCartRepository'
import useSetCurrentShippingMethodRepository from '#ioc/repositories/useSetCurrentShippingMethodRepository'
import useCartStore from '#ioc/stores/useCartStore'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const setCurrentShippingMethodRepository = useSetCurrentShippingMethodRepository()
  const getCatCartRepository = useGetCartRepository()

  return async (shippingMethod: ReturnType<ReturnType<typeof useToShippingMethod>>) => {
    await setCurrentShippingMethodRepository(shippingMethod)
    const { items } = await getCatCartRepository()

    checkoutStore.$patch({ currentShippingMethod: shippingMethod })
    cartStore.$patch({ items })
  }
}
