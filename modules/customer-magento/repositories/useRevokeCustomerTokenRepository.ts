import useMagento from '#ioc/composables/useMagento'
import RevokeCustomerToken from '#ioc/graphql/mutations/RevokeCustomerToken'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    result: string
    _success: boolean
    _error: any
  }> => {
    try {
      const { revokeCustomerToken: response } = await magento.graphql(RevokeCustomerToken())

      return {
        result: response?.result ?? '',
        _success: true,
        _error: null,
      }
    } catch (e) {
      console.error(e)

      return {
        result: '',
        _success: false,
        _error: e,
      }
    }
  }
}
