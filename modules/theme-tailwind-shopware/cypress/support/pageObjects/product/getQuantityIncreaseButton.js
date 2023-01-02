export default function getQuantityIncreaseButton() {
  return cy.get('[data-cy=product-quantity-configurator] > button:nth-of-type(2)')
}
