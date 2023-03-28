import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default <T extends (...args: any[]) => any>(useHandleCustomerNotAuthorized: T) => {
  return (): ((err: any) => void) => {
    const handleCustomerNotAuthorized = useHandleCustomerNotAuthorized()
    const checkoutStore = useCheckoutStore()

    return (error) => {
      if (error instanceof CustomerNotAuthorized) {
        checkoutStore.$reset()
      }
      handleCustomerNotAuthorized(error)
    }
  }
}
