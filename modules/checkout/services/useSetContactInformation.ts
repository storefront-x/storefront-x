import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useToContactInformation from '#ioc/mappers/useToContactInformation'

export default () => {
  const checkoutStore = useCheckoutStore()

  return async (contactInformation: ReturnType<ReturnType<typeof useToContactInformation>> | null) => {
    checkoutStore.$patch({ contactInformation })
  }
}
