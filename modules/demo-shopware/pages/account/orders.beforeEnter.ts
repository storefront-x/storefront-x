import useCustomer from '#ioc/composables/useCustomer'
import useLocalePath from '#ioc/composables/useLocalePath'

export default (to: any, from: any, next: any) => {
  const customer = useCustomer()
  const localePath = useLocalePath()

  if (!customer.isLoggedIn) {
    next(localePath('/sign-in'))
  }
  next()
}
