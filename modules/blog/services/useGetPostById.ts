import useGetPostByIdRepository from '#ioc/repositories/useGetPostByIdRepository'

export default () => {
  const getPostByIdRepository = useGetPostByIdRepository()

  return async (...args: Parameters<typeof getPostByIdRepository>) => {
    return await getPostByIdRepository(...args)
  }
}
