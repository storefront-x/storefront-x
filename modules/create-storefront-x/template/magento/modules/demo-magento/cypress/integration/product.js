<<<<<<< HEAD
import expectMicrocartQuantity from '~/cypress/support/pageObjects/Base/expectMicrocartQuantity'
import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/Base/expectMicrowishlistQuantity'
import expectNotificationReviewConfirm from '~/cypress/support/pageObjects/Base/expectNotificationReviewConfirm'
=======
import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/base/expectMicrowishlistQuantity'
import expectNotificationReviewConfirm from '~/cypress/support/pageObjects/base/expectNotificationReviewConfirm'

>>>>>>> 8f6b357 (Add refactor for Base module)
import Product from '~/cypress/support/pageObjects/Product'

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

<<<<<<< HEAD
    expectMicrocartQuantity.expectMicrocartQuantity(1)
=======
    expectMicrocartQuantity(1)
>>>>>>> 8f6b357 (Add refactor for Base module)
  })

  it('can be added to wishlist', () => {
    product.addToWishlist()

<<<<<<< HEAD
    expectMicrowishlistQuantity.expectMicrowishlistQuantity(1)
=======
    expectMicrowishlistQuantity(1)
>>>>>>> 8f6b357 (Add refactor for Base module)
  })

  it('allows increasing quantity via buttons', () => {
    product.increaseQuantity() // 2
    product.increaseQuantity() // 3
    product.decreaseQuantity() // 2

    product.addToCart()

<<<<<<< HEAD
    expectMicrocartQuantity.expectMicrocartQuantity(2)
=======
    expectMicrocartQuantity(2)
>>>>>>> 8f6b357 (Add refactor for Base module)
  })

  it('allows setting quantity via input', () => {
    product.setQuantity(3)

    product.addToCart()

<<<<<<< HEAD
    expectMicrocartQuantity.expectMicrocartQuantity(3)
=======
    expectMicrocartQuantity(3)
>>>>>>> 8f6b357 (Add refactor for Base module)
  })

  it('allows adding reviews', () => {
    product.openReviewForm()
    product.addReviewData()
<<<<<<< HEAD
    expectNotificationReviewConfirm.expectNotificationReviewConfirm()
=======
    expectNotificationReviewConfirm()
>>>>>>> 8f6b357 (Add refactor for Base module)
  })
})
