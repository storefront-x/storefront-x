export default function expectMicrocartQuantity(quantity) {
  return cy.get('[data-cy=microcart-quantity]').should('contain.text', quantity)
}
