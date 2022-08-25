import useGetAvailableCountriesRepository from '#ioc/repositories/useGetAvailableCountriesRepository'

export default () => {
  const getAvailableCountriesRepository = useGetAvailableCountriesRepository()

  return async (...args: Parameters<typeof getAvailableCountriesRepository>) => {
    return await getAvailableCountriesRepository(...args)
  }
}
