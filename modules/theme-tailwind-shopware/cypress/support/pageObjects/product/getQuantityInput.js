export default function getQuantityInput() {
  return cy.get('[data-cy=product-quantity-configurator] > input')
}
