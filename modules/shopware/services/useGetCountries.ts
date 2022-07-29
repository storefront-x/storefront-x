import useGetCountriesRepository from '#ioc/repositories/useGetCountriesRepository'

export default () => {
  const getCountries = useGetCountriesRepository()

  return async (...args: Parameters<typeof getCountries>) => {
    return await getCountries(...args)
  }
}
