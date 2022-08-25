import useChangeCustomerPasswordRepository from '#ioc/repositories/useChangeCustomerPasswordRepository'
import useCustomerStore from '#ioc/stores/useCustomerStore'

export default () => {
  const changeCustomerPasswordRepository = useChangeCustomerPasswordRepository()
  const customerStore = useCustomerStore()

  return async (newPassword: string, currentPassword: string) => {
    const { customer } = await changeCustomerPasswordRepository(currentPassword, newPassword)

    if (!customer) {
      throw new Error('Password has not been changed!')
    }

    customerStore.$patch({ customer })
  }
}
