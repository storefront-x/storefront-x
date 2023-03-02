import openMinicart from '~/cypress/support/pageObjects/minicart/openMinicart'
import closeMinicart from '~/cypress/support/pageObjects/minicart/closeMinicart'
import checkEmptyMinicart from '~/cypress/support/pageObjects/minicart/checkEmptyMinicart'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'
import continueShopping from '~/cypress/support/pageObjects/product/continueShopping'
import setProductQuantityInputFromMinicart from '~/cypress/support/pageObjects/minicart/setProductQuantityInputFromMinicart'
import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import increaseQuantityMinicart from '~/cypress/support/pageObjects/minicart/increaseQuantityMinicart'
import decreaseQuantityMinicart from '~/cypress/support/pageObjects/minicart/decreaseQuantityMinicart'

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
    const quantity = 1

    addToCart()

    openMinicart()
    closeMinicart()

    expectMicrocartQuantity(quantity)

    cy.reload()
    expectMicrocartQuantity(quantity)
  })

  it('change quantity of product by input in minicart', () => {
    const quantity = 2

    addToCart()
    continueShopping()
    openMinicart()
    setProductQuantityInputFromMinicart(quantity)
    closeMinicart()
    expectMicrocartQuantity(quantity)

    cy.reload()
    expectMicrocartQuantity(quantity)
  })

  it('increase quantity of product by buttons in minicart', () => {
    let quantity = 1

    addToCart()
    continueShopping()
    openMinicart()
    increaseQuantityMinicart()
    quantity++
    closeMinicart()

    expectMicrocartQuantity(quantity)

    cy.reload()
    expectMicrocartQuantity(quantity)
  })

  it('decrease quantity of product by buttons in minicart', () => {
    let quantity = 4

    addToCart()
    continueShopping()
    openMinicart()
    setProductQuantityInputFromMinicart(quantity)
    closeMinicart()

    expectMicrocartQuantity(quantity)

    openMinicart()
    decreaseQuantityMinicart()
    quantity--
    closeMinicart()

    expectMicrocartQuantity(quantity)

    cy.reload()
    expectMicrocartQuantity(quantity)
  })
})
