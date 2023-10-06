/* eslint-disable cypress/unsafe-to-chain-command */

export default () => {
  cy.withinIframe('#braintree-hosted-field-number').find('input[name=credit-card-number]').type('4111111111111111')
  cy.withinIframe('#braintree-hosted-field-expirationDate').find('input[name=expiration]').type('1125')
  cy.withinIframe('#braintree-hosted-field-cvv').find('input[name=cvv]').type('123')
  cy.get('[data-cy=braintree-confirm]').click()
}
