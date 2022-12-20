import Product from '~/cypress/support/pageObjects/Product'
import getOrderSummaryItems from '~/cypress/support/pageObjects/checkout/getOrderSummaryItems'

describe('Checkout', () => {
  /** @type {Product} */
  let product

  beforeEach(() => {
    product = new Product()
  })

  it('checks that reload wont delete checkout', () => {
    product.visitProduct()
    product.addToCart()
    product.continueToCheckout()

    getOrderSummaryItems()
    cy.reload().waitForSfx()
    getOrderSummaryItems()
  })
})
