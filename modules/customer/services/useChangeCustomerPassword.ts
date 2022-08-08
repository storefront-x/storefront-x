import useChangeCustomerPasswordRepository from '#ioc/repositories/useChangeCustomerPasswordRepository'

export default () => {
  const changeCustomerPasswordRepository = useChangeCustomerPasswordRepository()

  return async (...args: Parameters<typeof changeCustomerPasswordRepository>) => {
    return await changeCustomerPasswordRepository(...args)
  }
}
