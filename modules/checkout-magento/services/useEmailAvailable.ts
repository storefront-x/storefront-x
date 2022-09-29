import useGetIsEmailAvailable from '#ioc/repositories/useGetIsEmailAvailable'

export default () => {
  const isEmailAvailable = useGetIsEmailAvailable()

  return async (...args: Parameters<typeof isEmailAvailable>) => {
    return await isEmailAvailable(...args)
  }
}
