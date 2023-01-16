export default (shippingMethod) => {
  cy.get('input[name=email]').type('tester@testovic.cz')
  cy.get('input[name=firstName]').type('Tester')
  cy.get('input[name=lastName]').type('Testovič')
  cy.get('input[name=telephone]').type('123456789')

  if (shippingMethod !== 'instore_pickup') {
    cy.get('input[name=street]').type('Testovací 123')
    cy.get('input[name=city]').type('Brnel')
    cy.get('input[name=postcode]').type('12345')
  }
}
