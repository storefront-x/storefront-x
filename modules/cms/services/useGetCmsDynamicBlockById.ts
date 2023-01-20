import useGetCmsDynamicBlockByIdRepository from '#ioc/repositories/useGetCmsDynamicBlockByIdRepository'

export default () => {
  const getCmsDynamicBlockByIdRepository = useGetCmsDynamicBlockByIdRepository()

  return async (...args: Parameters<typeof getCmsDynamicBlockByIdRepository>) => {
    return await getCmsDynamicBlockByIdRepository(...args)
  }
}
