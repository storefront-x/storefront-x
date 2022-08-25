import useGetCheckoutAgreementsRepository from '#ioc/repositories/useGetCheckoutAgreementsRepository'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()
  const getCheckoutAgreementsRepository = useGetCheckoutAgreementsRepository()

  return async () => {
    const { checkoutAgreements } = await getCheckoutAgreementsRepository()

    checkoutStore.$patch({ agreements: checkoutAgreements })
  }
}
