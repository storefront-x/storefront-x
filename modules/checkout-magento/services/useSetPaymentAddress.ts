import useSetBillingAddressOnCartRepository from '#ioc/repositories/useSetBillingAddressOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setBillingAddressOnCartRepository = useSetBillingAddressOnCartRepository()

  return async (address: any) => {
    const { id } = await getOrCreateCartId()

    const checkout = await setBillingAddressOnCartRepository(id, address)

    checkoutStore.$patch(checkout)
  }
}
