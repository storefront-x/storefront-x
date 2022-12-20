export default function getCustomerAddress() {
  return cy.get('[data-cy=customer-address]').first()
}
