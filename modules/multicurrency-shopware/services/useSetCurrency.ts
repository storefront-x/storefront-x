import useSetCurrencyRepository from '#ioc/repositories/useSetCurrencyRepository'

export default () => {
  const setCurrencyRepository = useSetCurrencyRepository()

  return async (...args: Parameters<typeof setCurrencyRepository>) => {
    await setCurrencyRepository(...args)

    window.location.reload()
  }
}
