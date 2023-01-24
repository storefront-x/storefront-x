import ToProductElastic from '#ioc/mappers/ToProductElastic'
import Query from '#ioc/utils/elasticSearch/Query'

export default () => {
  return async (
    id: string,
  ): Promise<{
    product: ReturnType<typeof ToProductElastic>
  }> => {
    const data = await Query.products().where('product_id', id).first()

    const categories = await Query.categories().whereIn('id', data.category_ids).get()
    const mainCategoryArr = data.drmax_main_category_path.split('/')

    data.category = categories.filter((c: any) => mainCategoryArr.includes(c.url_key)).sort((a, b) => a.level - b.level)

    return {
      product: ToProductElastic(data),
    }
  }
}
