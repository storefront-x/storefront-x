import useGetCategoryByIdRepository, { CategoryOptions } from '#ioc/repositories/useGetCategoryByIdRepository'
import ToProduct from '#ioc/mappers/ToProduct'
import IS_CLIENT from '#ioc/config/IS_CLIENT'

export default () => {
  const getCategoryByIdRepository = useGetCategoryByIdRepository()
  let prevGetProducts = [] as ReturnType<typeof ToProduct>[]
  let storedPageSize = false

  return async (...args: CategoryOptions) => {
    let firstLoadPageSize = false
    const [id, { pageSize, page, ...subArgs }] = args

    if (IS_CLIENT && pageSize && !storedPageSize) {
      firstLoadPageSize = true
    }

    storedPageSize = pageSize

    if (firstLoadPageSize) {
      const firstLoadCategoryResponse = await getCategoryByIdRepository(id, { page: Number(page) - 1, ...subArgs })
      prevGetProducts = [...firstLoadCategoryResponse.products]
    }

    const categoryResponse = await getCategoryByIdRepository(id, { page, ...subArgs })
    prevGetProducts = [...prevGetProducts, ...categoryResponse.products]

    if (storedPageSize) {
      return { ...categoryResponse, products: prevGetProducts }
    }

    prevGetProducts = []

    return categoryResponse
  }
}
