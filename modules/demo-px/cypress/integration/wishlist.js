import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/base/expectMicrowishlistQuantity'
import gotoWishlist from '~/cypress/support/pageObjects/base/gotoWishlist'
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
    product = new Product()

    visitRandom()
    addToWishlist()
  })

  it('allows adding products to the wishlist from product detail page', () => {
    expectMicrowishlistQuantity(1)
    gotoWishlist()

    expectWishlistQuantity(1)
  })

  it('allows removing from the wishlist', () => {
    expectMicrowishlistQuantity(1)

    visitRandom()
    addToWishlist()

    gotoWishlist()

    expectWishlistQuantity(2)

    visitAgain(product)
    getAddToWishlist().click() // Clicking again will remove it from wishlist

    gotoWishlist()

    expectWishlistQuantity(1)
  })

  it('merges wishlist with customer wishlist', () => {
    register(accountCredentials)

    visitRandom()
    addToWishlist()

    logout()

    visitRandom()
    addToWishlist()

    login(accountCredentials)

    gotoWishlist()

    expectWishlistQuantity(3)
  })
})
