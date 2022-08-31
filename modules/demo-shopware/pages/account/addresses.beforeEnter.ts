import useCustomer from '#ioc/composables/useCustomer'

export default (to: any, from: any, next: any) => {
  const customer = useCustomer()

  if (!customer.isLoggedIn && to.name !== '/sign-in') {
    next('/sign-in')
  }
}
