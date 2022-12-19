import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import continueShopping from '~/cypress/support/pageObjects/base/continueShopping'
import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/base/expectMicrowishlistQuantity'

import Product from '~/cypress/support/pageObjects/Product'

describe('Product', () => {
  /** @type {Product} */
  let product

  beforeEach(() => {
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
    continueShopping()

    expectMicrocartQuantity(1).waitForSfx()
  })

  it('can be added to wishlist', () => {
    product.addToWishlist()

    expectMicrowishlistQuantity(1).waitForSfx()
  })

  it('allows increasing quantity via buttons', () => {
    product.increaseQuantity() // 2
    product.increaseQuantity() // 3
    product.decreaseQuantity() // 2

    product.addToCart()
    continueShopping()

    expectMicrocartQuantity(2).waitForSfx()
  })

  it('allows setting quantity via input', () => {
    product.setQuantity(3)

    product.addToCart()
    continueShopping()

    expectMicrocartQuantity(3)
  })
})
