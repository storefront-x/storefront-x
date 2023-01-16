export default (code) => cy.get(`[data-shipping-method=${code}]`).click()
