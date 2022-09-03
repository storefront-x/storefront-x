import ToContactInformation from '#ioc/mappers/ToContactInformation'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()

  return async (contactInformation: ReturnType<typeof ToContactInformation>) => {
    checkoutStore.$patch({ contactInformation })
  }
}
