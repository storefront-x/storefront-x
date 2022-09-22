import Base from '#cypress/support/pageObjects/Base'
import Product from '#cypress/support/pageObjects/Product'

describe('Product', () => {
  /** @type {Base} */
  let base

  /** @type {Product} */
  let product

  beforeEach(() => {
    base = new Base()
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

    base.expectMicrocartQuantity(1)
  })

  it('can be added to wishlist', () => {
    product.addToWishlist()

    base.expectMicrowishlistQuantity(1)
  })

  it('allows increasing quantity via buttons', () => {
    product.increaseQuantity() // 2
    product.increaseQuantity() // 3
    product.decreaseQuantity() // 2

    product.addToCart()

    base.expectMicrocartQuantity(2)
  })

  it('allows setting quantity via input', () => {
    product.setQuantity(3)

    product.addToCart()

    base.expectMicrocartQuantity(3)
  })

  it('allows adding reviews', () => {
    product.openReviewForm()
    product.addReviewData()
    base.expectNotificationReviewConfirm()
  })
})
