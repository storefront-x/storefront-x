export default function getInstorePickupLocation() {
  return cy.get('[data-cy=instore-pickup-location]').first()
}
