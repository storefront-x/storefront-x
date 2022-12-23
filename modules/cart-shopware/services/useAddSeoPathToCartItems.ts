import useGetSeoUrlRepository from '#ioc/repositories/useGetSeoUrlRepository'

export default () => {
  const getSeoUrlRepository = useGetSeoUrlRepository()

  return async (response: any) => {
    response.lineItems = await Promise.all(
      response.lineItems?.map(async (entry: any) => {
        const { seoPath } = await getSeoUrlRepository(entry.referencedId)
        entry.urlPath = seoPath
        return entry
      }),
    )
    return response
  }
}
