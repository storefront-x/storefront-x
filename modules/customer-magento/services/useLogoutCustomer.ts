import useLogoutCustomerRepository from '#ioc/repositories/useLogoutCustomerRepository'
import useLocalePath from '#ioc/composables/useLocalePath'
import useCartToken from '#ioc/composables/useCartToken'
import useCustomerToken from '#ioc/composables/useCustomerToken'

export default () => {
  const localePath = useLocalePath()
  const logoutCustomerRepository = useLogoutCustomerRepository()
  const cartToken = useCartToken()
  const customerToken = useCustomerToken()

  return async () => {
    await logoutCustomerRepository()

    cartToken.remove()
    customerToken.remove()

    window.location.href = localePath('sign-in')
  }
}
