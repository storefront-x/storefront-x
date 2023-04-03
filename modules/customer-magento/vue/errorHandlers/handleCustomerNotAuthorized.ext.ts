import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'
import useCustomerToken from '#ioc/composables/useCustomerToken'

export default <T extends (...args: any[]) => any>(useHandleCustomerNotAuthorized: T) => {
  return (): ((err: any) => void) => {
    const handleCustomerNotAuthorized = useHandleCustomerNotAuthorized()
    const customerToken = useCustomerToken()

    return (error) => {
      if (error instanceof CustomerNotAuthorized) {
        customerToken.remove()
      }
      handleCustomerNotAuthorized(error)
    }
  }
}
