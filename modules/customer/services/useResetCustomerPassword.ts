import useResetCustomerPasswordRepository from '#ioc/repositories/useResetCustomerPasswordRepository'

export default () => {
  const resetPassword = useResetCustomerPasswordRepository()

  return async (...args: Parameters<typeof resetPassword>) => {
    return await resetPassword(...args)
  }
}
