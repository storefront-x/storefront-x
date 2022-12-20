import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/Base/expectMicrowishlistQuantity'
import gotoWishlist from '~/cypress/support/pageObjects/Base/gotoWishlist'
import expectWishlistQuantity from '~/cypress/support/pageObjects/wishlist/expectWishlistQuantity'
import AccountCredentials from '~/cypress/support/pageObjects/account/accountCredentials'
import register from '~/cypress/support/pageObjects/account/register'
import login from '~/cypress/support/pageObjects/account/login'
import logout from '~/cypress/support/pageObjects/account/logout'

import Product from '~/cypress/support/pageObjects/Product'

describe('Wishlist', () => {
  /** @type {Product} */
  let product = null

  /** @type {AccountCredentials} */
  let accountCredentials = null

  before(() => {
    accountCredentials = new AccountCredentials()
  })

  beforeEach(() => {
    product = new Product()
  })

  it('allows adding products to the wishlist from product detail page', () => {
    product.visitRandom()
    product.addToWishlist()

    expectMicrowishlistQuantity(1)
    gotoWishlist()

    expectWishlistQuantity(1)
  })

  it('allows removing from the wishlist', () => {
    product.visitRandom()
    product.addToWishlist()

    expectMicrowishlistQuantity(1)

    product.visitRandom()
    product.addToWishlist()

    gotoWishlist()

    expectWishlistQuantity(2)

    product.visitAgain()
    product.getAddToWishlist().click() // Clicking again will remove it from wishlist

    gotoWishlist()

    expectWishlistQuantity(1)
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

    expectWishlistQuantity(3)
  })
})
