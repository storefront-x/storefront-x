export default (left: string, right: string): boolean => {
  const leftNormalized = left.replace(/^\//, '').replace(/\/$/, '')
  const rightNormalized = right.replace(/^\//, '').replace(/\/$/, '')

  return leftNormalized === rightNormalized
}
