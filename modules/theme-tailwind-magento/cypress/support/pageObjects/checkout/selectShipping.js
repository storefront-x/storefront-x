export default function selectShipping(code) {
  cy.get(`[data-shipping-method=${code}]`).click()
}
