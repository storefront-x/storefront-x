export default function getOrderSummaryItems() {
  return cy.get('[data-cy^=cart-summary-list-item-]:visible')
}
