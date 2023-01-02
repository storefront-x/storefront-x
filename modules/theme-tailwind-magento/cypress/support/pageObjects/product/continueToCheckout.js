export default function continueToCheckout() {
  return cy.get('[data-cy=continue-to-checkout]').click()
}
