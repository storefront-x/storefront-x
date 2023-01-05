import useAssignCompareListToCustomerRepository from '#ioc/repositories/useAssignCompareListToCustomerRepository'

export default () => {
  const assignCompareListToCustomerRepository = useAssignCompareListToCustomerRepository()

  return async (...args: Parameters<typeof assignCompareListToCustomerRepository>) => {
    return await assignCompareListToCustomerRepository(...args)
  }
}
