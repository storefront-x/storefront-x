import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/base/expectMicrowishlistQuantity'
import expectNotificationReviewConfirm from '~/cypress/support/pageObjects/base/expectNotificationReviewConfirm'

import Product from '~/cypress/support/pageObjects/product/Product'

describe('Product', () => {
  /** @type {Product} */
  let product

  beforeEach(() => {
    product = new Product()

    product.visitRandom()
  })

  it('contains product title', () => {
    product.getTitle().will('include.text', () => product.data.name)
  })

  it('contains product price', () => {
    product.getPrice().should('not.be.empty')
  })

  it('can be added to cart', () => {
    product.addToCart()

    expectMicrocartQuantity(1)
  })

  it('can be added to wishlist', () => {
    product.addToWishlist()

    expectMicrowishlistQuantity(1)
  })

  it('allows increasing quantity via buttons', () => {
    product.increaseQuantity() // 2
    product.increaseQuantity() // 3
    product.decreaseQuantity() // 2

    product.addToCart()

    expectMicrocartQuantity(2)
  })

  it('allows setting quantity via input', () => {
    product.setQuantity(3)

    product.addToCart()

    expectMicrocartQuantity(3)
  })

  it('allows adding reviews', () => {
    product.openReviewForm()
    product.addReviewData()
    expectNotificationReviewConfirm()
  })
})
