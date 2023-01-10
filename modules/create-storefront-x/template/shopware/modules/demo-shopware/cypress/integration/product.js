import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import continueShopping from '~/cypress/support/pageObjects/base/continueShopping'
import expectMicrowishlistQuantity from '~/cypress/support/pageObjects/base/expectMicrowishlistQuantity'
import Product from '~/cypress/support/pageObjects/product/Product'
import visitProduct from '~/cypress/support/pageObjects/product/visitProduct'
import getTitle from '~/cypress/support/pageObjects/product/getTitle'
import getPrice from '~/cypress/support/pageObjects/product/getPrice'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import addToWishlist from '~/cypress/support/pageObjects/product/addToWishlist'
import increaseQuantity from '~/cypress/support/pageObjects/product/increaseQuantity'
import decreaseQuantity from '~/cypress/support/pageObjects/product/decreaseQuantity'
import setQuantity from '~/cypress/support/pageObjects/product/setQuantity'

describe('Product', () => {
  /** @type {Product} */
  let product

  beforeEach(() => {
    product = new Product()

    visitProduct(product)
  })

  it('contains product title', () => {
    getTitle().will('include.text', product.productname)
  })

  it('contains product price', () => {
    getPrice().should('not.be.empty')
  })

  it('can be added to cart', () => {
    addToCart()
    continueShopping()

    expectMicrocartQuantity(1).waitForSfx()
  })

  it('can be added to wishlist', () => {
    addToWishlist()

    expectMicrowishlistQuantity(1).waitForSfx()
  })

  it('allows increasing quantity via buttons', () => {
    increaseQuantity() // 2
    increaseQuantity() // 3
    decreaseQuantity() // 2

    addToCart()
    continueShopping()

    expectMicrocartQuantity(2).waitForSfx()
  })

  it('allows setting quantity via input', () => {
    setQuantity(3)

    addToCart()
    continueShopping()

    expectMicrocartQuantity(3)
  })
})
