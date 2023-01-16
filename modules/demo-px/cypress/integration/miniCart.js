import openMinicart from '~/cypress/support/pageObjects/miniCart/openMinicart'
import closeMinicart from '~/cypress/support/pageObjects/miniCart/closeMinicart'
import checkEmptyMinicart from '~/cypress/support/pageObjects/miniCart/checkEmptyMinicart'
import getProductFromMinicart from '~/cypress/support/pageObjects/miniCart/getProductFromMinicart'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'

import Product from '~/cypress/support/pageObjects/Product'

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
