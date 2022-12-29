import useContext from '#ioc/composables/useContext'
import IS_CLIENT from '#ioc/config/IS_CLIENT'

export default () => {
  if (IS_CLIENT) {
    return () => undefined
  }
  const ctx = useContext()

  return async (status: number) => {
    ctx.responseStatus = status
  }
}
