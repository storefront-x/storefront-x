import useGetCartRepository from '#ioc/repositories/useGetCartRepository'

export default () => {
  const getCartRepository = useGetCartRepository()

  return async (...args: Parameters<typeof getCartRepository>) => {
    return await getCartRepository(...args)
  }
}
