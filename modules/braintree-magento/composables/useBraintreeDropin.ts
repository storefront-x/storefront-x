import dropin from 'braintree-web-drop-in'
import useMagento from '#ioc/composables/useMagento'
import CreateBraintreeClientToken from '#ioc/graphql/mutations/CreateBraintreeClientToken'

export default () => {
  const magento = useMagento()

  let instance: dropin.Dropin

  const initialize = async (container: string) => {
    const { data } = await magento.graphql(CreateBraintreeClientToken())

    const authorization = data.createBraintreeClientToken

    instance = await dropin.create({
      authorization,
      container,
    })
  }

  const requestPayment = async () => {
    if (!instance) throw new Error('Uninitialized')

    const response = await instance.requestPaymentMethod()

    return response
  }

  return {
    initialize,
    requestPayment,
  }
}
