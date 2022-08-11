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
    const {
      data: { generateCustomerToken },
    } = await magento.graphql(GenerateCustomerToken().with({ email, password }))

    return {
      token: generateCustomerToken?.token ?? '',
    }
  }
}
