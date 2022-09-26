import Checkout from '~/cypress/support/pageObjects/Checkout'
import Product from '~/cypress/support/pageObjects/Product'
import ThankYouPage from '~/cypress/support/pageObjects/ThankYouPage'

describe('Checkout', () => {
  // /** @type {Account} */
  // let account

  /** @type {Checkout} */
  let checkout

  /** @type {Product} */
  let product

  /** @type {ThankYouPage} */
  let thankYouPage

  // We don't want to create new account for every test
  // before(() => {
  //   account = new Account()
  // })

  beforeEach(() => {
    checkout = new Checkout()
    product = new Product()
    thankYouPage = new ThankYouPage()
  })

  it('finishes checkout process', () => {
    product.visitRandom()
    product.addToCart()
    product.continueToCheckout()

    checkout.selectShipping('flatrate_flatrate')
    checkout.selectPayment('checkmo')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()

    thankYouPage.isVisible()
  })

  it('accepts credit card payment', () => {
    product.visitRandom()
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
    product.visitRandom()
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

  //   it('allows selecting customer address', () => {
  //     account.register()
  //     account.createNewAddress()

  //     product.visitRandom()
  //     product.addToCart()
  //     product.continueToCheckout()

  //     checkout.selectShipping('flatrate_flatrate')
  //     checkout.selectPayment('checkmo')
  //     checkout.getCustomerAddress().should('include.text', account.firstName)
  //     checkout.getCustomerAddress().should('include.text', account.lastName)
  //     checkout.getCustomerAddress().click()
  //     checkout.confirmAgreements()
  //     checkout.placeOrder()

  //     thankYouPage.isVisible()
  //   })
})
