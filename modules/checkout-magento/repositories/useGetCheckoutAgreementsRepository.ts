import useMagento from '#ioc/composables/useMagento'
import GetCheckoutAgreements from '#ioc/graphql/queries/GetCheckoutAgreements'
import useToCheckoutAgreement from '#ioc/mappers/useToCheckoutAgreement'

export default () => {
  const magento = useMagento()
  const toCheckoutAgreement = useToCheckoutAgreement()

  return async () => {
    const { data } = await magento.graphql(GetCheckoutAgreements())

    return {
      checkoutAgreements: (data.checkoutAgreements as any[]).map(toCheckoutAgreement),
    }
  }
}
