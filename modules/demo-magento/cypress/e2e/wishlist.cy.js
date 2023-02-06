import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/base/expectMicrowishlistQuantity'
import goToWishlist from '~/cypress/support/pageObjects/base/goToWishlist'
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
    visitRandom(product)
    addToWishlist()
  })

  it('allows adding products to the wishlist from product detail page', () => {
    expectMicrowishlistQuantity(1)
    goToWishlist()
    expectWishlistQuantity(1)
  })

  it('allows removing from the wishlist', () => {
    expectMicrowishlistQuantity(1)

    visitRandom(product)
    addToWishlist()

    goToWishlist()

    expectWishlistQuantity(2)

    visitAgain(product)

    getAddToWishlist().click() // Clicking again will remove it from wishlist

    goToWishlist()

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

    goToWishlist()

    expectWishlistQuantity(3)
  })
})
