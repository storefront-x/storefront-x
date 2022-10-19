import uniqueNumber from '#ioc/utils/number/unique'

export default class Product {
  static Simple = 'SimpleProduct'

  constructor() {
    this.data = null
    this.data.name = 'Acer TravelMate 5742ZG-P613G32MN 39.6 cm (15.6") 1366 x 768 pixels Intel'
    this.data.url_key = '/acer-travelmate-5742zg-p613g32mn-39.6-cm-15.6-1366-x-768-pixels-intel/ALG2448'

    this.reviewContent = {
      nickname: 'nickname' + uniqueNumber(),
      title: 'Very nice product',
      text: 'Very nice product, thank you StorefrontX for quick delivery and support',
    }

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

  openReviewForm() {
    this.getReviewTab().scrollIntoView({ duration: 500 }).should('be.visible').click()
    this.getAddReviewButton().scrollIntoView({ duration: 500 }).should('be.visible')
    this.getAddReviewButton().click()
  }

  addReviewData() {
    this.getNicknameField().type(this.reviewContent.nickname)
    this.getTitleField().type(this.reviewContent.title)
    this.getTextField().type(this.reviewContent.text)

    this.getNthStar('Attributes', 3).trigger('mouseenter')
    this.getNthStar('Attributes', 3).click()

    this.getNthStar('Price', 3).trigger('mouseenter')
    this.getNthStar('Price', 3).click()

    this.getNthStar('Quality', 3).trigger('mouseenter')
    this.getNthStar('Quality', 3).click()

    this.getNthStar('Value', 3).trigger('mouseenter')
    this.getNthStar('Value', 3).click()

    this.getSubmitReviewButton().click()
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
