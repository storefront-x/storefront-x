export default class Checkout {
  constructor() {
    this.shippingMethod = null
    this.paymentMethod = null
  }

  getOrderSummaryItems() {
    return cy.get('[data-cy^=cart-summary-list-item-]:visible')
  }
}
