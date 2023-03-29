import CartResetted from '#ioc/errors/CartResetted'
import useCartToken from '#ioc/composables/useCartToken'

export default <T extends (...args: any[]) => any>(useHandleCartResetted: T) => {
  return (): ((err: any) => void) => {
    const handleCartResetted = useHandleCartResetted()
    const cartToken = useCartToken()

    return (error) => {
      handleCartResetted(error)
      if (error instanceof CartResetted) {
        cartToken.remove()
      }
    }
  }
}
