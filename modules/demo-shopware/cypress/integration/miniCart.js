import openMinicart from '~/cypress/support/pageObjects/minicart/openMinicart'
import closeMinicart from '~/cypress/support/pageObjects/minicart/closeMinicart'
import checkEmptyMinicart from '~/cypress/support/pageObjects/minicart/checkEmptyMinicart'
import getProductFromMinicart from '~/cypress/support/pageObjects/minicart/getProductFromMinicart'
import Product from '~/cypress/support/pageObjects/product/Product'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'

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
    visitRandom(product)
    addToCart()

    openMinicart()
    getProductFromMinicart().should('include.text', product.data.name)
    closeMinicart()
  })
})
