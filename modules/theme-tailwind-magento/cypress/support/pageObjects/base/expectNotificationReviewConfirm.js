export default function expectNotificationReviewConfirm() {
  return cy.get('[data-cy=notification-body').should('not.be.empty')
}
