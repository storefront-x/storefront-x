import MiniCart from '~/cypress/support/pageObjects/MiniCart'
import Product from '~/cypress/support/pageObjects/Product'

describe('Minicart', () => {
  /** @type {MiniCart} */
  let miniCart

  /** @type {Product} */
  let product

  beforeEach(() => {
    miniCart = new MiniCart()
    product = new Product()
  })

  it('open and close minicart without product', () => {
    cy.visit('/').waitForSfx()

    miniCart.open()
    miniCart.isEmpty()
    miniCart.close()
  })

  it('open and close minicart with product', () => {
    product.visitProduct()
    product.addToCart()

    miniCart.open()
    miniCart.getTitle().will('include.text', () => product.data.name)
    miniCart.close()
  })
})
