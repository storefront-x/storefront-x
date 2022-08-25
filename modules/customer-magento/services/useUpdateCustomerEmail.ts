import useUpdateCustomerEmailRepository from '#ioc/repositories/useUpdateCustomerEmailRepository'
import useCustomerStore from '#ioc/stores/useCustomerStore'

export default () => {
  const updateCustomerEmailRepository = useUpdateCustomerEmailRepository()
  const customerStore = useCustomerStore()

  return async (email: string, password: string) => {
    const { customer } = await updateCustomerEmailRepository(email, password)

    if (!customer) {
      throw new Error('Email has not been updated!')
    }

    customerStore.$patch({ customer })
  }
}
