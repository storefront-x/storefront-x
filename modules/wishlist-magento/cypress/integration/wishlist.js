import Base from '#cypress/support/pageObjects/Base'
import Wishlist from '#cypress/support/pageObjects/Wishlist'
import Product from '#cypress/support/pageObjects/Product'
import Account from '#cypress/support/pageObjects/Account'

describe('Wishlist', () => {
  /** @type {Base} */
  let base = null

  /** @type {Wishlist} */
  let wishlist = null

  /** @type {Product} */
  let product = null

  /** @type {Account} */
  let account = null

  before(() => {
    account = new Account()
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

    account.register()

    product.visitRandom()
    product.addToWishlist()

    account.logout()

    product.visitRandom()
    product.addToWishlist()

    account.login()

    base.gotoWishlist()

    wishlist.expectWishlistQuantity(3)
  })
})
