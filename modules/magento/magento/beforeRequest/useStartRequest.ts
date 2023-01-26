import useContext from '#ioc/composables/useContext'

export default () => {
  const ctx = useContext()

  return async () => {
    ctx.startTime = Date.now()
  }
}
