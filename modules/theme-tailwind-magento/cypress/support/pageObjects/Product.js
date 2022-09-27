import GetProducts from '~/cypress/support/repositories/GetProducts'
import randomNumber from '~/cypress/utils/randomNumber'
import uniqueNumber from '~/cypress/utils/uniqueNumber'

export default class Product {
  static Simple = 'SimpleProduct'

  constructor() {
    this.data = null

    this.reviewContent = {
      nickname: 'nickname' + uniqueNumber(),
      title: 'Very nice product',
      text: 'Very nice product, thank you StorefrontX for quick delivery and support',
    }

    this._products = null
  }

  visitRandom(type = Product.Simple) {
    return cy.then(() => {
      if (this._products) {
        this._visitRandom(type)
      } else {
        GetProducts().then((products) => {
          this._products = products

          this._visitRandom(type)
        })
      }
    })
  }

  _visitRandom(type = Product.Simple) {
    let index = null
    let product = null

    // eslint-disable-next-line no-constant-condition
    while (true) {
      index = randomNumber(0, this._products.length)
      product = this._products[index]

      if (product.__typename === type) break
    }

    this.data = product
    this._products = [...this._products.slice(0, index), ...this._products.slice(index + 1, this._products.length)]

    cy.visit(product.url_key + '.html').waitForSfx()
  }

  visitAgain() {
    return cy.then(() => cy.visit(this.data.url_key + this.data.url_suffix).waitForSfx())
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
    this.getReviewTab().click()
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
