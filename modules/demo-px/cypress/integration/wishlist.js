import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/base/expectMicrowishlistQuantity'
import gotoWishlist from '~/cypress/support/pageObjects/base/gotoWishlist'

import Wishlist from '~/cypress/support/pageObjects/Wishlist'
import Product from '~/cypress/support/pageObjects/Product'
import AccountCredentials from '~/cypress/support/pageObjects/account/AccountCredentials'
import register from '~/cypress/support/pageObjects/account/register'
import login from '~/cypress/support/pageObjects/account/login'
import logout from '~/cypress/support/pageObjects/account/logout'

describe('Wishlist', () => {
  /** @type {Wishlist} */
  let wishlist = null

  /** @type {Product} */
  let product = null

  /** @type {Account} */
  let accountCredentials = null

  before(() => {
    accountCredentials = new AccountCredentials()
  })

  beforeEach(() => {
    wishlist = new Wishlist()
    product = new Product()
  })

  it('allows adding products to the wishlist from product detail page', () => {
    product.visitRandom()
    product.addToWishlist()

    expectMicrowishlistQuantity(1)
    gotoWishlist()

    wishlist.expectWishlistQuantity(1)
  })

  it('allows removing from the wishlist', () => {
    product.visitRandom()
    product.addToWishlist()

    expectMicrowishlistQuantity(1)

    product.visitRandom()
    product.addToWishlist()

    gotoWishlist()

    wishlist.expectWishlistQuantity(2)

    product.visitAgain()
    product.getAddToWishlist().click() // Clicking again will remove it from wishlist

    gotoWishlist()

    wishlist.expectWishlistQuantity(1)
  })

  it('merges wishlist with customer wishlist', () => {
    product.visitRandom()
    product.addToWishlist()

    register.register(accountCredentials)

    product.visitRandom()
    product.addToWishlist()

    logout.logout()

    product.visitRandom()
    product.addToWishlist()

    login.login(accountCredentials)

    gotoWishlist()

    wishlist.expectWishlistQuantity(3)
  })
})
