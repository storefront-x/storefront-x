import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/graphql/addFields'

export default (self: any) => {
  return () => {
    const fragment = self()
    addFields(fragment, {
      rating_summary: field(),
      review_count: field(),
    })

    return fragment
  }
}
