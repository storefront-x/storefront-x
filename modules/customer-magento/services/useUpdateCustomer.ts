import useUpdateCustomerRepository from '#ioc/repositories/useUpdateCustomerRepository'
import useCustomerStore from '#ioc/stores/useCustomerStore'

export default () => {
  const updateCustomerRepository = useUpdateCustomerRepository()
  const customerStore = useCustomerStore()

  return async (...args: Parameters<typeof updateCustomerRepository>) => {
    const { customer } = await updateCustomerRepository(...args)

    if (!customer) {
      throw new Error('Information has not been updated!')
    }

    customerStore.$patch({ customer })
  }
}
