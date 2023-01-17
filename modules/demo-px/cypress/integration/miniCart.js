import openMinicart from '~/cypress/support/pageObjects/minicart/openMinicart'
import closeMinicart from '~/cypress/support/pageObjects/minicart/closeMinicart'
import checkEmptyMinicart from '~/cypress/support/pageObjects/minicart/checkEmptyMinicart'
import getProductFromMinicart from '~/cypress/support/pageObjects/minicart/getProductFromMinicart'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'

import Product from '~/cypress/support/pageObjects/product/Product'

describe('Minicart', () => {
  /** @type {Product} */
  let product

  beforeEach(() => {
    product = new Product()
    visitRandom(product)
  })

  it('open and close minicart without product', () => {
    openMinicart()
    checkEmptyMinicart()
    closeMinicart()
  })

  it('open and close minicart with product', () => {
    addToCart()

    openMinicart()
    getProductFromMinicart().should('include.text', product.data.name)
    closeMinicart()
  })
})
