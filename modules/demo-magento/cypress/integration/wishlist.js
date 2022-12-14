import Base from '~/cypress/support/pageObjects/Base'
import Wishlist from '~/cypress/support/pageObjects/Wishlist'
import Product from '~/cypress/support/pageObjects/Product'
import AccountCredentials from '~/cypress/support/pageObjects/account/AccountCredentials'

import register from '~/cypress/support/pageObjects/account/register'
import login from '~/cypress/support/pageObjects/account/login'
import logout from '~/cypress/support/pageObjects/account/logout'

describe('Wishlist', () => {
  /** @type {Base} */
  let base = null

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
    base = new Base()
    wishlist = new Wishlist()
    product = new Product()
  })

  it('allows adding products to the wishlist from product detail page', () => {
    product.visitRandom()
    product.addToWishlist()

    base.expectMicrowishlistQuantity(1)
    base.gotoWishlist()

    wishlist.expectWishlistQuantity(1)
  })

  it('allows removing from the wishlist', () => {
    product.visitRandom()
    product.addToWishlist()

    base.expectMicrowishlistQuantity(1)

    product.visitRandom()
    product.addToWishlist()

    base.gotoWishlist()

    wishlist.expectWishlistQuantity(2)

    product.visitAgain()
    product.getAddToWishlist().click() // Clicking again will remove it from wishlist

    base.gotoWishlist()

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

    base.gotoWishlist()

    wishlist.expectWishlistQuantity(3)
  })
})
