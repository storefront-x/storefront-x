import Product from '~/cypress/support/pageObjects/product/Product'
import visitProduct from '~/cypress/support/pageObjects/product/visitProduct'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import continueToCheckout from '~/cypress/support/pageObjects/product/continueToCheckout'
import getOrderSummaryItems from '~/cypress/support/pageObjects/checkout/getOrderSummaryItems'

describe('Checkout', () => {
  /** @type {Product} */
  let product

  beforeEach(() => {
    product = new Product()
  })

  it('checks that reload wont delete checkout', () => {
    visitProduct(product)
    addToCart()
    continueToCheckout()

    getOrderSummaryItems()
    cy.reload().waitForSfx()
    getOrderSummaryItems()
  })
})
