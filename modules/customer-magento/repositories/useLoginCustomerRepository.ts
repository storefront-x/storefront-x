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
    const { generateCustomerToken: response } = await magento.graphql(GenerateCustomerToken().with({ email, password }))
    if (response.errors) {
      throw new Error(response.errors[0].message)
    }

    return {
      token: response?.token ?? '',
    }
  }
}
