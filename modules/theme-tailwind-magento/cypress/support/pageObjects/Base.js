export default class Base {
  gotoWishlist() {
    return cy.get('[data-cy=micro-wishlist]').click()
  }

  expectMicrocartQuantity(quantity) {
    return cy.get('[data-cy=microcart-quantity]').should('contain.text', quantity)
  }

  expectMicrowishlistQuantity(quantity) {
    return cy.get('[data-cy=micro-wishlist-quantity]').should('contain.text', quantity)
  }

  expectNotificationReviewConfirm() {
    return cy.get('[data-cy=notification-body').should('not.be.empty')
  }
}
