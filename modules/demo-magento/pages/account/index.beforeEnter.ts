import { NavigationGuard } from 'vue-router'
import useCustomer from '#ioc/composables/useCustomer'

const navigationGuard: NavigationGuard = (to, from, next) => {
  const customer = useCustomer()

  if (!customer?.isLoggedIn) {
    next('/sign-in')
  } else {
    next()
  }
}

export default navigationGuard
