import useGetCmsBlockByIdentifier from '#ioc/repositories/useGetCmsBlockByIdentifier'

export default () => {
  const getCmsBlockByIdentifier = useGetCmsBlockByIdentifier()

  return async (...args: Parameters<typeof getCmsBlockByIdentifier>) => {
    return await getCmsBlockByIdentifier(...args)
  }
}
