import useLogoutCustomerRepository from '#ioc/repositories/useLogoutCustomerRepository'
import useLocalePath from '#ioc/composables/useLocalePath'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import useCartToken from '#ioc/composables/useCartToken'
import useCustomerToken from '#ioc/composables/useCustomerToken'

export default () => {
  const localePath = useLocalePath()
  const logoutCustomerRepository = useLogoutCustomerRepository()
  const cartMagentoStore = useCartMagentoStore()
  const cartToken = useCartToken()
  const customerToken = useCustomerToken()

  return async () => {
    await logoutCustomerRepository()

    cartToken.remove()
    customerToken.remove()

    cartMagentoStore.$patch({ cartId: '' })

    window.location.href = localePath('sign-in')
  }
}
