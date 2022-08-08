import useUpdateCustomerEmailRepository from '#ioc/repositories/useUpdateCustomerEmailRepository'

export default () => {
  const updateCustomerEmailRepository = useUpdateCustomerEmailRepository()

  return async (...args: Parameters<typeof updateCustomerEmailRepository>) => {
    return await updateCustomerEmailRepository(...args)
  }
}
