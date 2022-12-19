import useGetCompareListByIdRepository from '#ioc/repositories/useGetCompareListByIdRepository'

export default () => {
  const getCompareListByIdRepository = useGetCompareListByIdRepository()

  return async (...args: Parameters<typeof getCompareListByIdRepository>) => {
    return await getCompareListByIdRepository(...args)
  }
}
