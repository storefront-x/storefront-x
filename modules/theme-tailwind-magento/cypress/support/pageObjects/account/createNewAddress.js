export default function createNewAddress() {
  cy.visit('/account/addresses').waitForSfx()

  cy.get('[data-cy=new-address]').click()

  cy.get('input[name=firstName]').type(this.firstName)
  cy.get('input[name=lastName]').type(this.lastName)
  cy.get('input[name=phoneNumber]').type('123456789')
  cy.get('input[name=street]').type('Testovací')
  cy.get('input[name=city]').type('Brnel')
  cy.get('input[name=zipcode]').type('12345')
  cy.get('select[name=countryCode]').select('CZ')

  cy.get('[data-cy=save]').click()
}
