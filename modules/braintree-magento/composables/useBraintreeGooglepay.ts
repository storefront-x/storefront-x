import useCheckout from '#ioc/composables/useCheckout'
import useMagento from '#ioc/composables/useMagento'
import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'
import CreateBraintreeClientToken from '#ioc/graphql/mutations/CreateBraintreeClientToken'
import loadScript from '#ioc/utils/dom/loadScript'
import once from '#ioc/utils/once'
import braintree from 'braintree-web'

interface Options {
  environment?: 'TEST' | 'PRODUCTION'
}

const GOOGLE_PAY_VERSION = 2

export default (options: Options = {}) => {
  const magento = useMagento()
  const checkout = useCheckout()

  let googlePayment: braintree.GooglePayment
  let googlePaymentClient: any

  const initialize = async () => {
    const { data } = await magento.graphql(CreateBraintreeClientToken())

    const authorization = data.createBraintreeClientToken

    const client = await braintree.client.create({
      authorization,
    })

    googlePayment = await braintree.googlePayment.create({
      client,
      googlePayVersion: GOOGLE_PAY_VERSION,
      // Optional in sandbox; if set in sandbox, this value must be a valid production Google Merchant ID
      googleMerchantId: 'merchant-id-from-google',
    })

    await once('https://pay.google.com/gp/p/js/pay.js', loadScript)

    googlePaymentClient = new window.google.payments.api.PaymentsClient({
      environment: options.environment ?? 'TEST',
    })
  }

  const requestPayment = async () => {
    if (!googlePayment || !googlePaymentClient) throw new Error('Uninitialized')

    const dataPaymentRequest = await googlePayment.createPaymentDataRequest({
      transactionInfo: {
        currencyCode: checkout.grandTotal!.currency!,
        totalPriceStatus: 'FINAL',
        totalPrice: (checkout.grandTotal!.value / PRICE_OFFSET).toString(),
      },
    })

    const paymentData = await googlePaymentClient.loadPaymentData(dataPaymentRequest)

    const paymentResult = await googlePayment.parseResponse(paymentData)

    return paymentResult
  }

  return {
    initialize,
    requestPayment,
  }
}
