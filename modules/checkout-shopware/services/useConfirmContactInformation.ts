import useToContactInformation from '#ioc/mappers/useToContactInformation'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()

  return async (contactInformation: ReturnType<ReturnType<typeof useToContactInformation>>) => {
    checkoutStore.$patch({ contactInformation })
  }
}
