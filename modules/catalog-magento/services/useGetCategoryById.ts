import useGetCategoryByIdRepository from '#ioc/repositories/useGetCategoryByIdRepository'
import ToProduct from '#ioc/mappers/ToProduct'
import IS_CLIENT from '#ioc/config/IS_CLIENT'

interface Options {
  page?: number
  pageSize?: number
  filter?: any
  sort?: any
  pages?: number
}

export default () => {
  const getCategoryByIdRepository = useGetCategoryByIdRepository()

  let previousProducts = [] as ReturnType<typeof ToProduct>[]

  return async (id: string, { page = 1, pageSize, filter, sort, pages = 1 }: Options = {}) => {
    const isInitialLoadWithLoadMore = IS_CLIENT && pages > 1 && previousProducts.length === 0

    if (isInitialLoadWithLoadMore) {
      const firstLoadCategoryResponse = await getCategoryByIdRepository(id, {
        page: page - 1,
        pageSize,
        filter,
        sort,
      })

      previousProducts.push(...firstLoadCategoryResponse.products)
    }

    const categoryResponse = await getCategoryByIdRepository(id, { page, pageSize, filter, sort })

    previousProducts.push(...categoryResponse.products)

    if (pages > 1 && previousProducts.length > 0) {
      return { ...categoryResponse, products: [...categoryResponse.products, ...previousProducts] }
    } else {
      // User clicks on page, thus resetting load more.
      previousProducts = []

      return categoryResponse
    }
  }
}
