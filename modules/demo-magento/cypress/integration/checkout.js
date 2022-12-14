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
    product = new Product()
    thankYouPage = new ThankYouPage()
  })

  let addRandomProductToCartAndProceedToCheckout = () => {
    product.visitRandom()
    product.addToCart()
    product.continueToCheckout()
  }

  it('checks that reload wont delete checkout', () => {
    addRandomProductToCartAndProceedToCheckout()

    checkout.getOrderSummaryItems()
    cy.reload().waitForSfx()
    checkout.getOrderSummaryItems()
  })

  it('finishes checkout process', () => {
    addRandomProductToCartAndProceedToCheckout()

    checkout.selectShipping('flatrate_flatrate')
    checkout.selectPayment('checkmo')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()

    thankYouPage.isVisible()
  })

  it('accepts credit card payment', () => {
    addRandomProductToCartAndProceedToCheckout()

    checkout.selectShipping('flatrate_flatrate')
    checkout.selectPayment('braintree')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()
    checkout.fillCreditCardInfo()

    thankYouPage.isVisible()
  })

  it('supports instore pickup', () => {
    addRandomProductToCartAndProceedToCheckout()

    checkout.selectShipping('instore_pickup')
    checkout.getInstorePickupLocation().click()
    checkout.selectPayment('checkmo')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()

    thankYouPage.isVisible()
  })
})
