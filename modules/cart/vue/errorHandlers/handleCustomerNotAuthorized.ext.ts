import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'
import useCartStore from '#ioc/stores/useCartStore'

export default <T extends (...args: any[]) => any>(useHandleCustomerNotAuthorized: T) => {
  return (): ((err: any) => void) => {
    const handleCustomerNotAuthorized = useHandleCustomerNotAuthorized()
    const cartStore = useCartStore()

    return (error) => {
      if (error instanceof CustomerNotAuthorized) {
        cartStore.$reset()
      }
      handleCustomerNotAuthorized(error)
    }
  }
}
