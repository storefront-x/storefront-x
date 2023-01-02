import useContext from '#ioc/composables/useContext'
import IS_CLIENT from '#ioc/config/IS_CLIENT'

type SetResponseStatus = (status: number) => void

export default (): SetResponseStatus => {
  if (IS_CLIENT) {
    return () => undefined
  }

  const ctx = useContext()

  return (status: number) => {
    ctx.responseStatus = status
  }
}
