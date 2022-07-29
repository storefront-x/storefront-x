import MINUTES from '#ioc/utils/date/MINUTES'

export default (date: Date) => {
  const time = date.getTime()
  const offset = date.getTimezoneOffset() * MINUTES

  return new Date(time - offset)
}
