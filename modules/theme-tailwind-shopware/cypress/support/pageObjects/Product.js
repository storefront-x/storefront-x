export default class Product {
  constructor(params = {}) {
    this.productname = params.productname ?? '3M 6531B self-adhesive note paper Rectangle Yellow 100 sheets'
    this.url_key = params.url_key ?? '/3m-6531b-self-adhesive-note-paper-rectangle-yellow-100-sheets/ZMQ2141'
    this.product_SKU = params.product_SKU ?? 'ZMQ2141'
    this.product_price = params.product_price ?? '€3420.00'
  }

  visitProduct() {
    return cy.visit(this.url_key).waitForSfx()
  }

  visitAgain() {
    return cy.visit(this.productname.waitForSfx())
  }

  addToCart() {
    return this.getAddToCart().click().waitForSfx()
  }

  continueToCheckout() {
    return cy.get('[data-cy=continue-to-checkout]').click()
  }

  addToWishlist() {
    return this.getAddToWishlist().click()
  }

  decreaseQuantity() {
    this.getQuantityDecreaseButton().click()
  }

  increaseQuantity() {
    this.getQuantityIncreaseButton().click()
  }

  setQuantity(quantity) {
    this.getQuantityInput().clear()
    this.getQuantityInput().type(quantity)
    this.getQuantityInput().blur()
  }

  getTitle() {
    return cy.get('[data-cy=title]')
  }

  getPrice() {
    return cy.get('[data-cy=product-price]')
  }

  getAddToCart() {
    return cy.get('[data-cy=add-to-cart]').first()
  }

  getAddToWishlist() {
    return cy.get('[data-cy=add-to-wishlist]').first()
  }

  getReviewTab() {
    return cy.get('a[name=Reviews]')
  }

  getQuantityInput() {
    return cy.get('[data-cy=product-quantity-configurator] > input')
  }

  getQuantityDecreaseButton() {
    return cy.get('[data-cy=product-quantity-configurator] > button:nth-of-type(1)')
  }

  getQuantityIncreaseButton() {
    return cy.get('[data-cy=product-quantity-configurator] > button:nth-of-type(2)')
  }
}
