import useMagento from '#ioc/composables/useMagento'
import GetCheckoutAgreements from '#ioc/graphql/queries/GetCheckoutAgreements'
import ToCheckoutAgreement from '#ioc/mappers/ToCheckoutAgreement'

export default () => {
  const magento = useMagento()

  return async () => {
    const { data } = await magento.graphql(GetCheckoutAgreements())

    return {
      checkoutAgreements: (data.checkoutAgreements as any[]).map(ToCheckoutAgreement),
    }
  }
}
