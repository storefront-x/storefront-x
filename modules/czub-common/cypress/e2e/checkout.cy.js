import getOrderSummaryItems from '~/cypress/support/pageObjects/checkout/getOrderSummaryItems'
import selectShipping from '~/cypress/support/pageObjects/checkout/selectShipping'
import selectPayment from '~/cypress/support/pageObjects/checkout/selectPayment'
import fillShippingInfo from '~/cypress/support/pageObjects/checkout/fillShippingInfo'
import placeOrder from '~/cypress/support/pageObjects/checkout/placeOrder'
import checkThankYouPageVisibility from '~/cypress/support/pageObjects/thankYouPage/checkThankYouPageVisibility'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import continueToCheckout from '~/cypress/support/pageObjects/product/continueToCheckout'
import Product from '~/cypress/support/pageObjects/product/Product'

describe('Checkout', () => {
  /** @type {Product} */
  let product = null

  beforeEach(() => {
    product = new Product()
    addRandomProductToCartAndProceedToCheckout(product)
  })

  let addRandomProductToCartAndProceedToCheckout = (product) => {
    visitRandom(product)
    addToCart()
    continueToCheckout()
  }

  it('checks that reload wont delete checkout', () => {
    getOrderSummaryItems()
    cy.reload().waitForSfx()
    getOrderSummaryItems()
  })

  it('finishes checkout process', () => {
    const shippingMethod = 'flatrate_flatrate'

    selectShipping(shippingMethod)
    selectPayment('checkmo')
    fillShippingInfo(shippingMethod)
    placeOrder()

    checkThankYouPageVisibility()
  })
})
