import useUpdateCustomerRepository from '#ioc/repositories/useUpdateCustomerRepository'

export default () => {
  const updateCustomerRepository = useUpdateCustomerRepository()

  return async (...args: Parameters<typeof updateCustomerRepository>) => {
    return await updateCustomerRepository(...args)
  }
}
