export default (sort: any) => {
  if (!sort) return {}

  const [sortBy, sortDir] = sort.split(',')

  return { [sortBy]: sortDir }
}
