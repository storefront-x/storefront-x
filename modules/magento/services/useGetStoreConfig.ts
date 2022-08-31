import useGetStoreConfigRepository from '#ioc/repositories/useGetStoreConfigRepository'

export default () => {
  const getStoreConfigRepository = useGetStoreConfigRepository()

  return async (...args: Parameters<typeof getStoreConfigRepository>) => {
    return await getStoreConfigRepository(...args)
  }
}
