import CreateCustomer from '#ioc/graphql/mutations/CreateCustomer'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (
    data: any,
  ): Promise<{
    email: string
    _success: boolean
    _error: any
  }> => {
    try {
      const { createCustomer: response } = await magento.graphql(CreateCustomer().with(data))

      return {
        email: response?.customer?.email ?? '',
        _success: true,
        _error: null,
      }
    } catch (e) {
      console.error(e)

      return {
        email: '',
        _success: false,
        _error: e,
      }
    }
  }
}
