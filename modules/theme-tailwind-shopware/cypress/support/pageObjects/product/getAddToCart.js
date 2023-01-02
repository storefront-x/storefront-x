export default function getAddToCart() {
  return cy.get('[data-cy=add-to-cart]').first()
}
