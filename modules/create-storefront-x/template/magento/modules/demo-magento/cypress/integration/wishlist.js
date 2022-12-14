import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/Base/expectMicrowishlistQuantity'
import gotoWishlist from '~/cypress/support/pageObjects/Base/gotoWishlist'
import Wishlist from '~/cypress/support/pageObjects/Wishlist'
import Product from '~/cypress/support/pageObjects/Product'
import AccountCredentials from '~/cypress/support/pageObjects/account/accountCredentials'
import register from '~/cypress/support/pageObjects/account/register'
import login from '~/cypress/support/pageObjects/account/login'
import logout from '~/cypress/support/pageObjects/account/logout'

describe('Wishlist', () => {
  /** @type {Wishlist} */
  let wishlist = null

  /** @type {Product} */
  let product = null

  /** @type {AccountCredentials} */
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

    expectMicrowishlistQuantity.expectMicrowishlistQuantity(1)
    gotoWishlist.gotoWishlist()

    wishlist.expectWishlistQuantity(1)
  })

  it('allows removing from the wishlist', () => {
    product.visitRandom()
    product.addToWishlist()

    expectMicrowishlistQuantity.expectMicrowishlistQuantity(1)

    product.visitRandom()
    product.addToWishlist()

    gotoWishlist.gotoWishlist()

    wishlist.expectWishlistQuantity(2)

    product.visitAgain()
    product.getAddToWishlist().click() // Clicking again will remove it from wishlist

    gotoWishlist.gotoWishlist()

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

    gotoWishlist.gotoWishlist()

    wishlist.expectWishlistQuantity(3)
  })
})
