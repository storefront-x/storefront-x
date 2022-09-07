import useGetCmsBlockByIdentifiers from '#ioc/repositories/useGetCmsBlockByIdentifiers'

export default () => {
  const getCmsBlockByIdentifiers = useGetCmsBlockByIdentifiers()

  return async (...args: Parameters<typeof getCmsBlockByIdentifiers>) => {
    return await getCmsBlockByIdentifiers(...args)
  }
}
