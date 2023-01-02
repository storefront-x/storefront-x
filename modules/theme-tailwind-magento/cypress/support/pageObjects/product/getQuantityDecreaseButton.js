export default function getQuantityDecreaseButton() {
  return cy.get('[data-cy=product-quantity-configurator] > button:nth-of-type(1)')
}
