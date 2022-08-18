import useMagento from '#ioc/composables/useMagento'
import CreateEmptyCart from '#ioc/graphql/mutations/CreateEmptyCart'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    id: string
  }> => {
    const { data } = await magento.graphql(CreateEmptyCart())

    return {
      id: data.createEmptyCart,
    }
  }
}
