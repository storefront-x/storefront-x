import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/base/expectMicrowishlistQuantity'
import gotoWishList from '~/cypress/support/pageObjects/base/gotoWishList'
import expectWishlistQuantity from '~/cypress/support/pageObjects/wishlist/expectWishlistQuantity'
import AccountCredentials from '~/cypress/support/pageObjects/account/AccountCredentials'
import register from '~/cypress/support/pageObjects/account/register'
import login from '~/cypress/support/pageObjects/account/login'
import logout from '~/cypress/support/pageObjects/account/logout'
import Product from '~/cypress/support/pageObjects/product/Product'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'
import addToWishlist from '~/cypress/support/pageObjects/product/addToWishlist'
import visitAgain from '~/cypress/support/pageObjects/product/visitAgain'
import getAddToWishlist from '~/cypress/support/pageObjects/product/getAddToWishlist'

describe('Wishlist', () => {
  /** @type {Product} */
  let product = null

  /** @type {Account} */
  let accountCredentials = null

  before(() => {
    accountCredentials = new AccountCredentials()
  })

  beforeEach(() => {
    // GetProducts().then((products) => {
    product = new Product()

    //   cy.log(Cypress._.sample(products))
    //   cy.visit(Cypress._.sample(products.url_key))
    // })
    visitRandom(product)
    addToWishlist()
    cy.log(product)
  })

  it('allows adding products to the wishlist from product detail page', () => {
    expectMicrowishlistQuantity(1)
    gotoWishList()
    cy.log(product)
    expectWishlistQuantity(1)
  })

  it('allows removing from the wishlist', () => {
    expectMicrowishlistQuantity(1)

    visitRandom(product)
    addToWishlist()

    gotoWishList()

    expectWishlistQuantity(2)

    visitAgain(product)

    getAddToWishlist().click() // Clicking again will remove it from wishlist
    // cy.pause()

    gotoWishList()

    expectWishlistQuantity(1)
  })

  it('merges wishlist with customer wishlist', () => {
    register(accountCredentials)

    visitRandom(product)
    addToWishlist()

    logout()

    visitRandom(product)
    addToWishlist()

    login(accountCredentials)

    gotoWishList()

    expectWishlistQuantity(3)
  })
})
