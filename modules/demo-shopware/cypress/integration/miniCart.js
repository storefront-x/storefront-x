import openMinicart from '~/cypress/support/pageObjects/minicart/openMinicart'
import closeMinicart from '~/cypress/support/pageObjects/minicart/closeMinicart'
import checkEmptyMinicart from '~/cypress/support/pageObjects/minicart/checkEmptyMinicart'
import getProductFromMinicart from '~/cypress/support/pageObjects/minicart/getProductFromMinicart'
import Product from '~/cypress/support/pageObjects/product/Product'
import visitProduct from '~/cypress/support/pageObjects/product/visitProduct'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import continueToCheckout from '~/cypress/support/pageObjects/product/continueToCheckout'

describe('Minicart', () => {
  /** @type {Product} */
  let product

  beforeEach(() => {
    product = new Product()
  })

  it('open and close minicart without product', () => {
    cy.visit('/').waitForSfx()

    openMinicart()
    checkEmptyMinicart()
    closeMinicart()
  })

  it('open and close minicart with product', () => {
    visitProduct(product)
    addToCart()
    continueToCheckout()

    cy.visit('/').waitForSfx()

    openMinicart()
    getProductFromMinicart().should('include.text', product.productname)
    closeMinicart()
  })
})
