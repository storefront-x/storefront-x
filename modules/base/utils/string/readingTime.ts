export default (string: string) => {
  const words = string.trim().split(/\s+/).length
  const time = Math.ceil(words / 200)

  return Math.ceil(time)
}
