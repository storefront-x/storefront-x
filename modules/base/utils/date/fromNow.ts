export default (time: number) => {
  const now = Date.now()

  return new Date(now + time)
}
