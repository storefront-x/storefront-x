import useRemoveCouponFromCartRepository from '#ioc/repositories/useRemoveCouponFromCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const removeCouponFromCartRepository = useRemoveCouponFromCartRepository()

  return async () => {
    const { id } = await getOrCreateCartId()

    const response = await removeCouponFromCartRepository(id)

    cartStore.$patch(response)
  }
}
