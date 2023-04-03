import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/base/expectMicrowishlistQuantity'
import expectNotificationReviewConfirm from '~/cypress/support/pageObjects/base/expectNotificationReviewConfirm'
import Product from '~/cypress/support/pageObjects/product/Product'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'
import getTitle from '~/cypress/support/pageObjects/product/getTitle'
import getPrice from '~/cypress/support/pageObjects/product/getPrice'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import addToWishlist from '~/cypress/support/pageObjects/product/addToWishlist'
import increaseQuantity from '~/cypress/support/pageObjects/product/increaseQuantity'
import decreaseQuantity from '~/cypress/support/pageObjects/product/decreaseQuantity'
import setQuantity from '~/cypress/support/pageObjects/product/setQuantity'
import openReviewForm from '~/cypress/support/pageObjects/product/openReviewForm'
import addReviewData from '~/cypress/support/pageObjects/product/addReviewData'

describe('Product', () => {
  /** @type {Product} */
  let product

  beforeEach(() => {
    product = new Product()

    visitRandom(product)
  })

  it('contains product title', () => {
    getTitle().should('include.text', product.data.name)
  })

  it('contains product price', () => {
    getPrice().should('not.be.empty')
  })

  it('can be added to cart', () => {
    addToCart()

    expectMicrocartQuantity(1)
  })

  it('can be added to wishlist', () => {
    addToWishlist()

    expectMicrowishlistQuantity(1)
  })

  it('allows increasing quantity via buttons', () => {
    increaseQuantity() // 2
    increaseQuantity() // 3
    decreaseQuantity() // 2

    addToCart()

    expectMicrocartQuantity(2)
  })

  it('allows setting quantity via input', () => {
    setQuantity(3)

    addToCart()

    expectMicrocartQuantity(3)
  })

  it('allows adding reviews', () => {
    openReviewForm()
    addReviewData(product.reviewContent)
    expectNotificationReviewConfirm()
  })
})
