import useGetCurrenciesRepository from '#ioc/repositories/useGetCurrenciesRepository'

export default () => {
  const getCurrenciesRepository = useGetCurrenciesRepository()

  return async (...args: Parameters<typeof getCurrenciesRepository>) => {
    return await getCurrenciesRepository(...args)
  }
}
