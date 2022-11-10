import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/graphql/addFields'

export default (self: any) => {
  return () => {
    const query = self()

    addFields(query, 'products.items', {
      rating_summary: field(),
      review_count: field(),
    })

    return query
  }
}
