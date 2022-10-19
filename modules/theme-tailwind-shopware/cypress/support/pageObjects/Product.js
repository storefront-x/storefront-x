export default class Product {
  constructor() {
    this.data = null
    this.data.name = 'Acer TravelMate 5742ZG-P613G32MN 39.6 cm (15.6") 1366 x 768 pixels Intel'
    this.data.url_key = '/acer-travelmate-5742zg-p613g32mn-39.6-cm-15.6-1366-x-768-pixels-intel/ALG2448'

    /*product = new Product(
      (url_key = '3m-6531b-self-adhesive-note-paper-rectangle-yellow-100-sheets/ZMQ2141'),
      (product_name = '3M 6531B self-adhesive note paper Rectangle Yellow 100 sheets'),
      (product_SKU = 'ZMQ2141'),
      (product_price = '€3420.00'),
    )*/

    //this._products = null
  }

  visitProduct() {
    return cy.then(() => cy.visit(this.data.url_key).waitForSfx())
  }

  visitAgain() {
    return cy.then(() => cy.visit(this.data.url_key + '.html').waitForSfx())
  }

  addToCart() {
    return this.getAddToCart().click()
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
    return cy.get('[data-cy=title')
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

  getAddReviewButton() {
    return cy.get('[data-cy=add-review-button]')
  }

  getNicknameField() {
    return cy.get('input[name=nickname]')
  }

  getTitleField() {
    return cy.get('input[name=summary]')
  }

  getTextField() {
    return cy.get('textarea[name=text]')
  }

  getNthStar(type, n) {
    return cy.get(`[data-cy=${type}] svg:nth-of-type(${n})`)
  }

  getSubmitReviewButton() {
    return cy.get('[data-cy=submit-review]')
  }
}
