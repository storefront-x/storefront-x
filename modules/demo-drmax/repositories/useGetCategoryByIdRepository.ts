import ToCategoryElastic from '#ioc/mappers/ToCategoryElastic'
import ToProductElastic from '#ioc/mappers/ToProductElastic'

import ToAggregation from '#ioc/mappers/ToAggregation'

import Query from '#ioc/utils/elasticSearch/Query'
interface CategoryOptions {
  page?: number
  pageSize?: number
  filter?: any
  sort?: any
}

export default () => {
  return async (
    id: number,
    { page = 1, pageSize = 16, filter, sort = 'asc' }: CategoryOptions = {},
  ): Promise<{
    category: ReturnType<typeof ToCategoryElastic>
    products: ReturnType<typeof ToProductElastic>[]
    aggregations: ReturnType<typeof ToAggregation>[]
    totalCount: number
  }> => {
    const category = await Query.categories().where('id', id).first()

    const { items: products, total } = await Query.products()
      .whereIn('category_ids', id)
      .whereIn('drmax_pim_status', 'Available')
      .sort('final_price', sort.split('price,').pop())
      .from((page - 1) * pageSize)
      .paginate(pageSize)

    return {
      category: ToCategoryElastic(category) ?? {},
      products: products.map(ToProductElastic) ?? [],
      aggregations: [],
      totalCount: total.value,
    }
  }
}
