import Base from '~/cypress/support/pageObjects/Base'
import Product from '~/cypress/support/pageObjects/Product'

describe('Product', () => {
  /** @type {Base} */
  let base

  /** @type {Product} */
  let product

  beforeEach(() => {
    base = new Base()
    product = new Product()

    product.visitProduct()
  })

  it('contains product title', () => {
    product.getTitle().will('include.text', product.productname)
  })

  it('contains product price', () => {
    product.getPrice().should('not.be.empty')
  })

  it('can be added to cart', () => {
    product.addToCart()
    base.continueShopping()

    base.expectMicrocartQuantity(1).waitForSfx()
  })

  it('can be added to wishlist', () => {
    product.addToWishlist()

    base.expectMicrowishlistQuantity(1).waitForSfx()
  })

  it('allows increasing quantity via buttons', () => {
    product.increaseQuantity() // 2
    product.increaseQuantity() // 3
    product.decreaseQuantity() // 2

    product.addToCart()
    base.continueShopping()

    base.expectMicrocartQuantity(2).waitForSfx()
  })

  it('allows setting quantity via input', () => {
    product.setQuantity(3)

    product.addToCart()
    base.continueShopping()

    base.expectMicrocartQuantity(3)
  })
})
