import useApplyCouponToCartRepository from '#ioc/repositories/useApplyCouponToCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const applyCouponToCartRepository = useApplyCouponToCartRepository()

  return async (code: string) => {
    const { id } = await getOrCreateCartId()

    const response = await applyCouponToCartRepository(id, code)

    cartStore.$patch(response)
  }
}
