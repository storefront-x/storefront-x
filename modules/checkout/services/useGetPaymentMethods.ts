import useGetPaymentMethodsRepository from '#ioc/repositories/useGetPaymentMethodsRepository'

export default () => {
  const getPaymentMethodsRepository = useGetPaymentMethodsRepository()

  return async (...args: Parameters<typeof getPaymentMethodsRepository>) => {
    return await getPaymentMethodsRepository(...args)
  }
}
