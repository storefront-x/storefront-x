import useCustomer from '#ioc/composables/useCustomer'

export default (to: any, from: any, next: any) => {
  const customer = useCustomer()

  if (!customer?.isLoggedIn) {
    next('/sign-in')
  } else {
    next()
  }
}
