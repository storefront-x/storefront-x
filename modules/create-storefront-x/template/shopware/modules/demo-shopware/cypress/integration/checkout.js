import Product from '~/cypress/support/pageObjects/Product'
import Checkout from '~/cypress/support/pageObjects/Checkout'

describe('Checkout', () => {
  /** @type {Product} */
  let product

  /** @type {Checkout} */
  let checkout

  beforeEach(() => {
    product = new Product()
    checkout = new Checkout()
  })

  it('checks that reload wont delete checkout', () => {
    product.visitProduct()
    product.addToCart()
    product.continueToCheckout()

    checkout.getOrderSummaryItems()
    cy.reload().waitForSfx()
    checkout.getOrderSummaryItems()
  })
})
