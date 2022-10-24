import useGetIsEmailAvailable from '#ioc/repositories/useGetIsEmailAvailableRepository'

export default () => {
  const isEmailAvailable = useGetIsEmailAvailable()

  return async (...args: Parameters<typeof isEmailAvailable>) => {
    return await isEmailAvailable(...args)
  }
}
