import expectMicroCompareListQuantity from '~/cypress/support/pageObjects/comparison/expectMicroCompareListQuantity'
import gotoCompareList from '~/cypress/support/pageObjects/comparison/gotoCompareList'
import expectCompareListQuantity from '~/cypress/support/pageObjects/comparison/expectCompareListQuantity'
import AccountCredentials from '~/cypress/support/pageObjects/account/AccountCredentials'
import register from '~/cypress/support/pageObjects/account/register'
import login from '~/cypress/support/pageObjects/account/login'
import Product from '~/cypress/support/pageObjects/product/Product'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'
import addToComparison from '~/cypress/support/pageObjects/product/addToComparison'
import visitAgain from '~/cypress/support/pageObjects/product/visitAgain'
import getAddToComparison from '~/cypress/support/pageObjects/product/getAddToComparison'
import getNotificationError from '~/cypress/support/pageObjects/base/getNotificationError'

describe('Comparison', () => {
  /** @type {Product} */
  let product = null

  /** @type {Account} */
  let accountCredentials = null

  before(() => {
    accountCredentials = new AccountCredentials()
  })

  beforeEach(() => {
    cy.clearCookies()
    product = new Product()
    visitRandom(product)
    addToComparison()
  })

  it('allows adding products to the compare list from product detail page', () => {
    expectMicroCompareListQuantity(1)
    gotoCompareList()
    expectCompareListQuantity(1)
  })

  it('allows removing from the compare list', () => {
    expectMicroCompareListQuantity(1)

    visitRandom(product)
    addToComparison()

    gotoCompareList()

    expectMicroCompareListQuantity(2)
    expectCompareListQuantity(2)

    visitAgain(product)

    getAddToComparison().click() // Clicking again will remove it from wishlist

    gotoCompareList()

    expectMicroCompareListQuantity(1)
    expectCompareListQuantity(1)
  })

  it('allows adding to compare list as logged in user', () => {
    register(accountCredentials)

    visitRandom(product)
    addToComparison()

    gotoCompareList()

    expectMicroCompareListQuantity(1)
    expectCompareListQuantity(1)
  })

  it('allows removing from compare list as logged in user', () => {
    login(accountCredentials)

    visitRandom(product)
    addToComparison()

    gotoCompareList()

    expectMicroCompareListQuantity(2)
    expectCompareListQuantity(2)

    visitAgain(product)

    getAddToComparison().click() // Clicking again will remove it from wishlist

    gotoCompareList()

    expectMicroCompareListQuantity(1)
    expectCompareListQuantity(1)
  })

  it('allows adding up to 4 products to the compare list', () => {
    expectMicroCompareListQuantity(1)

    visitRandom(product)
    addToComparison()

    gotoCompareList()
    expectMicroCompareListQuantity(2)
    expectCompareListQuantity(2)

    visitRandom(product)
    addToComparison()

    gotoCompareList()
    expectMicroCompareListQuantity(3)
    expectCompareListQuantity(3)

    visitRandom(product)
    addToComparison()

    gotoCompareList()
    expectMicroCompareListQuantity(4)
    expectCompareListQuantity(4)

    visitRandom(product)
    addToComparison()

    getNotificationError().should('be.visible')

    gotoCompareList()
    expectMicroCompareListQuantity(4)
    expectCompareListQuantity(4)
  })
})
