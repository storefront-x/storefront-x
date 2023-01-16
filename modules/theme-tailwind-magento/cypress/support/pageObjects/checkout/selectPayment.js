export default (code) => cy.get(`[data-payment-method=${code}]`).click()
