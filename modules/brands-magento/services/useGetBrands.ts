import useGetBrandsRepository from '#ioc/repositories/useGetBrandsRepository'

export default () => {
  const getBrandsRepository = useGetBrandsRepository()

  return async (...args: Parameters<typeof getBrandsRepository>) => {
    return await getBrandsRepository(...args)
  }
}
