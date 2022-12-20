export default function selectPayment(code) {
  cy.get(`[data-payment-method=${code}]`).click()
}
