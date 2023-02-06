import useCreateCompareListRepository from '#ioc/repositories/useCreateCompareListRepository'

export default () => {
  const createComparelistRepository = useCreateCompareListRepository()

  return async () => {
    return await createComparelistRepository()
  }
}
