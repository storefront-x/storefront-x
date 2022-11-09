import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import useGetCustomerCartId from '#ioc/repositories/useGetCustomerCartIdRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useMergeCartsRepository from '#ioc/repositories/useMergeCartsRepository'
import useCartStore from '#ioc/stores/useCartStore'

export default () => {
  const cookies = useCookies()
  const cartMagentoStore = useCartMagentoStore()
  const getCustomerCartId = useGetCustomerCartId()
  const getOrCreateCartId = useGetOrCreateCartId()
  const mergeCarts = useMergeCartsRepository()
  const cartStore = useCartStore()

  return async () => {
    try {
      const { id: sourceCartId } = await getOrCreateCartId()
      const { id: destinationCartId } = await getCustomerCartId()

      if (sourceCartId === destinationCartId) return

      const { cart } = await mergeCarts(sourceCartId, destinationCartId)
      cartStore.$patch({ cart })

      cookies.set(MAGENTO_CART_COOKIE_NAME, destinationCartId, { path: '/' })
      cartMagentoStore.$patch({ cartId: destinationCartId })
    } catch (error) {
      cartMagentoStore.$patch({ cartId: '' })
      cookies.remove(MAGENTO_CART_COOKIE_NAME)
      console.warn(error)
    }
  }
}
