import field from '#ioc/graphql/field'
import Review from '#ioc/graphql/fragments/Review'
import CATALOG_REVIEWS_PER_PAGE from '#ioc/config/CATALOG_REVIEWS_PER_PAGE'
import addFields from '#ioc/utils/graphql/addFields'

export default (self: any) => {
  return () => {
    const query = self()

    addFields(query, 'products.items', {
      rating_summary: field(),
      review_count: field(),
      reviews: field()
        .args({
          pageSize: CATALOG_REVIEWS_PER_PAGE,
        })
        .fields({
          items: field({
            ...Review(),
          }),
        }),
    })

    return query
  }
}
