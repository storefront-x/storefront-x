import useMagento from '#ioc/composables/useMagento'
import RevokeCustomerToken from '#ioc/graphql/mutations/RevokeCustomerToken'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    result: string
  }> => {
    const {
      data: { revokeCustomerToken },
    } = await magento.graphql(RevokeCustomerToken())

    return {
      result: revokeCustomerToken?.result ?? '',
    }
  }
}
