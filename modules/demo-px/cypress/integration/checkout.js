import Checkout from '~/cypress/support/pageObjects/Checkout'
import Product from '~/cypress/support/pageObjects/Product'

import checkThankYouPageVisibility from '~/cypress/support/pageObjects/thankYouPage/checkThankYouPageVisibility'

describe('Checkout', () => {
  /** @type {Checkout} */
  let checkout

  /** @type {Product} */
  let product

  beforeEach(() => {
    checkout = new Checkout()
    product = new Product()
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

    checkThankYouPageVisibility()
  })

  it('accepts credit card payment', () => {
    addRandomProductToCartAndProceedToCheckout()

    checkout.selectShipping('flatrate_flatrate')
    checkout.selectPayment('braintree')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()
    checkout.fillCreditCardInfo()

    checkThankYouPageVisibility()
  })

  it('supports instore pickup', () => {
    addRandomProductToCartAndProceedToCheckout()

    checkout.selectShipping('instore_pickup')
    checkout.getInstorePickupLocation().click()
    checkout.selectPayment('checkmo')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()

    checkThankYouPageVisibility()
  })
})
