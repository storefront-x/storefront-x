import openMinicart from '~/cypress/support/pageObjects/minicart/openMinicart'
import closeMinicart from '~/cypress/support/pageObjects/minicart/closeMinicart'
import checkEmptyMinicart from '~/cypress/support/pageObjects/minicart/checkEmptyMinicart'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'
import continueShopping from '~/cypress/support/pageObjects/product/continueShopping'
import setProductQuantityInputFromMinicart from '~/cypress/support/pageObjects/minicart/setProductQuantityInputFromMinicart'
import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import increaseProductQuantityFromMinicart from '~/cypress/support/pageObjects/minicart/increaseProductQuantityFromMinicart'
import decreaseProductQuantityFromMinicart from '~/cypress/support/pageObjects/minicart/decreaseProductQuantityFromMinicart'
import removeProductFromMinicart from '~/cypress/support/pageObjects/minicart/removeProductFromMinicart'
import keepProductInCheckoutFromRemovalModal from '~/cypress/support/pageObjects/minicart/keepProductInCheckoutFromRemovalModal'
import getProductTitleFromMinicart from '~/cypress/support/pageObjects/minicart/getProductTitleFromMinicart'
import removeProductFromCheckoutFromRemovalModal from '~/cypress/support/pageObjects/minicart/removeProductFromCheckoutFromRemovalModal'

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
    increaseProductQuantityFromMinicart()
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
    decreaseProductQuantityFromMinicart()
    quantity--
    closeMinicart()
    expectMicrocartQuantity(quantity)

    cy.reload()
    expectMicrocartQuantity(quantity)
  })

  it('remove product from minicart', () => {
    addToCart()
    continueShopping()
    openMinicart()
    removeProductFromMinicart()
    removeProductFromCheckoutFromRemovalModal()

    cy.reload().waitForSfx()
    openMinicart()
    checkEmptyMinicart()
  })

  it('remove product from minicart, but in modal say to keep it', () => {
    const quantity = 1

    addToCart()
    continueShopping()
    openMinicart()
    removeProductFromMinicart()
    keepProductInCheckoutFromRemovalModal()

    cy.reload().waitForSfx()
    expectMicrocartQuantity(quantity)
    openMinicart()
    getProductTitleFromMinicart().should('contain', product.data.name)
  })

  it('set quantity to 0 to remove the product, then remove it', () => {
    addToCart()
    continueShopping()
    openMinicart()
    decreaseProductQuantityFromMinicart()
    removeProductFromCheckoutFromRemovalModal()

    cy.reload().waitForSfx()
    openMinicart()
    checkEmptyMinicart()
  })

  it('set quantity to 0 to remove the product, then keep it', () => {
    const quantity = 1

    addToCart()
    continueShopping()
    openMinicart()
    decreaseProductQuantityFromMinicart()
    keepProductInCheckoutFromRemovalModal()
    expectMicrocartQuantity(quantity)

    cy.reload().waitForSfx()
    expectMicrocartQuantity(quantity)
    openMinicart()
    getProductTitleFromMinicart().should('contain', product.data.name)
  })
})
