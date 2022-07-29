import useGetSeoUrlRepository from '#ioc/repositories/useGetSeoUrlRepository'

export default () => {
  const getSeoUrlRepository = useGetSeoUrlRepository()

  return async (...args: Parameters<typeof getSeoUrlRepository>) => {
    return await getSeoUrlRepository(...args)
  }
}
