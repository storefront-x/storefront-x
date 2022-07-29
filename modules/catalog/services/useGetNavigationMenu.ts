import useGetNavigationMenuRepository from '#ioc/repositories/useGetNavigationMenuRepository'

export default () => {
  const getNavigationMenuRepository = useGetNavigationMenuRepository()

  return async (...args: Parameters<typeof getNavigationMenuRepository>) => {
    return await getNavigationMenuRepository(...args)
  }
}
