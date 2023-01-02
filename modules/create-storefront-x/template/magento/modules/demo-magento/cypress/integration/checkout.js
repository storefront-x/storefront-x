import getOrderSummaryItems from '~/cypress/support/pageObjects/checkout/getOrderSummaryItems'
import selectShipping from '~/cypress/support/pageObjects/checkout/selectShipping'
import selectPayment from '~/cypress/support/pageObjects/checkout/selectPayment'
import fillShippingInfo from '~/cypress/support/pageObjects/checkout/fillShippingInfo'
import confirmAgreements from '~/cypress/support/pageObjects/checkout/confirmAgreements'
import placeOrder from '~/cypress/support/pageObjects/checkout/placeOrder'
import fillCreditCardInfo from '~/cypress/support/pageObjects/checkout/fillCreditCardInfo'
import getInstorePickupLocation from '~/cypress/support/pageObjects/checkout/getInstorePickupLocation'
import checkThankYouPageVisibility from '~/cypress/support/pageObjects/thankYouPage/checkThankYouPageVisibility'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import continueToCheckout from '~/cypress/support/pageObjects/product/continueToCheckout'

describe('Checkout', () => {
  beforeEach(() => {
    addRandomProductToCartAndProceedToCheckout()
  })

  let addRandomProductToCartAndProceedToCheckout = () => {
    visitRandom()
    addToCart()
    continueToCheckout()
  }

  it('checks that reload wont delete checkout', () => {
    getOrderSummaryItems()
    cy.reload().waitForSfx()
    getOrderSummaryItems()
  })

  it('finishes checkout process', () => {
    selectShipping('flatrate_flatrate')
    selectPayment('checkmo')
    fillShippingInfo()
    confirmAgreements()
    placeOrder()

    checkThankYouPageVisibility()
  })

  it('accepts credit card payment', () => {
    selectShipping('flatrate_flatrate')
    selectPayment('braintree')
    fillShippingInfo()
    confirmAgreements()
    placeOrder()
    fillCreditCardInfo()

    checkThankYouPageVisibility()
  })

  it('supports instore pickup', () => {
    selectShipping('instore_pickup')
    getInstorePickupLocation().click()
    selectPayment('checkmo')
    fillShippingInfo()
    confirmAgreements()
    placeOrder()

    checkThankYouPageVisibility()
  })
})
