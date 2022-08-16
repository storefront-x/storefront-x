import useGetCmsPageByIdRepository from '#ioc/repositories/useGetCmsPageByIdRepository'

export default () => {
  const getCmsPageByIdRepository = useGetCmsPageByIdRepository()

  return async (...args: Parameters<typeof getCmsPageByIdRepository>) => {
    return await getCmsPageByIdRepository(...args)
  }
}
