import useGetCurrentPaymentMethodRepository from '#ioc/repositories/useGetCurrentPaymentMethodRepository'

export default () => {
  const getCurrentPaymentMethodRepository = useGetCurrentPaymentMethodRepository()

  return async (...args: Parameters<typeof getCurrentPaymentMethodRepository>) => {
    return await getCurrentPaymentMethodRepository(...args)
  }
}
