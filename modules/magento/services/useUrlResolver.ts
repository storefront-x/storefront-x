import useUrlResolverRepository from '#ioc/repositories/useUrlResolverRepository'

export default () => {
  const urlResolverRepository = useUrlResolverRepository()

  return async (...args: Parameters<typeof urlResolverRepository>) => {
    return await urlResolverRepository(...args)
  }
}
