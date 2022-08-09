import GenerateCustomerToken from '#ioc/graphql/mutations/GenerateCustomerToken'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (
    email: string,
    password: string,
  ): Promise<{
    token: string
  }> => {
    try {
      const { generateCustomerToken: response } = await magento.graphql(
        GenerateCustomerToken().with({ email, password }),
      )

      return {
        token: response?.token ?? '',
      }
    } catch (e) {
      console.error(e)

      return {
        token: '',
      }
    }
  }
}
