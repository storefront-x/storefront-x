import useSetShippingMethodOnCartRepository from '#ioc/repositories/useSetShippingMethodOnCartRepository'

export default () => {
  const setShippingMethodOnCartRepository = useSetShippingMethodOnCartRepository()

  return async (...args: Parameters<typeof setShippingMethodOnCartRepository>) => {
    return await setShippingMethodOnCartRepository(...args)
  }
}
