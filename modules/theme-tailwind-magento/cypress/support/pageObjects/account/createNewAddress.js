export default (params = {}) => {
  cy.visit('/account/addresses').waitForSfx()

  cy.get('[data-cy=new-address]').click()

  cy.get('input[name=firstName]').type(params.firstName ?? 'Karel')
  cy.get('input[name=lastName]').type(params.lastName ?? 'Varel')
  cy.get('input[name=phoneNumber]').type(params.phoneNumber ?? '123456789')
  cy.get('input[name=street]').type(params.street ?? 'Testovací')
  cy.get('input[name=city]').type(params.city ?? 'Brno')
  cy.get('input[name=zipcode]').type(params.zipcode ?? '12345')
  cy.get('select[name=countryCode]').select(params.countryCode ?? 'CZ')

  cy.get('[data-cy=save]').click()
}
