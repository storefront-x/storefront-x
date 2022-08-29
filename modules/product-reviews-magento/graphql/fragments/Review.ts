import field from '#ioc/graphql/field'

export default () => ({
  text: field(),
  average_rating: field(),
  nickname: field(),
  summary: field(),
  created_at: field(),
  ratings_breakdown: field({
    name: field(),
    value: field(),
  }),
})
