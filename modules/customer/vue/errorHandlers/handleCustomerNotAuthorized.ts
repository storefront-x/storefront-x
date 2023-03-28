import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import redirect from '#ioc/utils/redirect'
import useRoute from '#ioc/composables/useRoute'

export default () => {
  const route = useRoute()
  const customerStore = useCustomerStore()

  return (error: any) => {
    if (error instanceof CustomerNotAuthorized) {
      customerStore.$patch({ customer: null })

      redirect(route.fullPath, 302)
    } else {
      throw error
    }
  }
}
