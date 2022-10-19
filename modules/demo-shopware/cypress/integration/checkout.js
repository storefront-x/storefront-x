import Checkout from '~/cypress/support/pageObjects/Checkout'
import Product from '~/cypress/support/pageObjects/Product'
import ThankYouPage from '~/cypress/support/pageObjects/ThankYouPage'

describe('Checkout', () => {
  /** @type {Checkout} */
  let checkout

  /** @type {Product} */
  let product

  /** @type {ThankYouPage} */
  let thankYouPage

  beforeEach(() => {
    checkout = new Checkout()
    /*product = new Product(
      (url_key = '3m-6531b-self-adhesive-note-paper-rectangle-yellow-100-sheets/ZMQ2141'),
      (product_name = '3M 6531B self-adhesive note paper Rectangle Yellow 100 sheets'),
      (product_SKU = 'ZMQ2141'),
      (product_price = '€3420.00'),
    )*/
    product = new Product()
    thankYouPage = new ThankYouPage()
  })

  it('finishes checkout process', () => {
    product.visitProduct()
    product.addToCart()
    product.continueToCheckout()

    checkout.selectShipping('flatrate_flatrate')
    checkout.selectPayment('checkmo')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()

    thankYouPage.isVisible()
  })

  it.only('accepts credit card payment', () => {
    product.visitProduct()
    product.addToCart()
    product.continueToCheckout()

    checkout.selectShipping('flatrate_flatrate')
    checkout.selectPayment('braintree')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()
    checkout.fillCreditCardInfo()

    thankYouPage.isVisible()
  })

  it('supports instore pickup', () => {
    product.visitProduct()
    product.addToCart()
    product.continueToCheckout()

    checkout.selectShipping('instore_pickup')
    checkout.getInstorePickupLocation().click()
    checkout.selectPayment('checkmo')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()

    thankYouPage.isVisible()
  })
})
