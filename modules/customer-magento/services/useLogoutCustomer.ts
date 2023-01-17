import useLogoutCustomerRepository from '#ioc/repositories/useLogoutCustomerRepository'
import useLocalePath from '#ioc/composables/useLocalePath'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import useCartTokenIdent from '#ioc/composables/useCartTokenIdent'
import useCustomerTokenIdent from '#ioc/composables/useCustomerTokenIdent'

export default () => {
  const localePath = useLocalePath()
  const logoutCustomerRepository = useLogoutCustomerRepository()
  const cartMagentoStore = useCartMagentoStore()
  const cartTokenIdent = useCartTokenIdent()
  const customerTokenIdent = useCustomerTokenIdent()

  return async () => {
    await logoutCustomerRepository()

    localStorage.removeItem(cartTokenIdent)
    localStorage.removeItem(customerTokenIdent)

    cartMagentoStore.$patch({ cartId: '' })

    window.location.href = localePath('sign-in')
  }
}
