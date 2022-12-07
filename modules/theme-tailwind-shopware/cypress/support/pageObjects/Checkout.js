export default class Checkout {
  constructor() {
    this.shippingMethod = null
    this.paymentMethod = null
  }

  checkOrderSummaryItems() {
    return cy.get('[data-cy^=cart-summary-list-item-]:visible')
  }
}
