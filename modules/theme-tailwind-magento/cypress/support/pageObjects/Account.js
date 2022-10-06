import uniqueNumber from '#ioc/utils/number/unique'

export default class Account {
  constructor(params = {}) {
    this.firstName = params.firstName ?? 'Tester'
    this.lastName = params.lastName ?? 'Testovič'
    this.email = params.emal ?? `tester+${uniqueNumber()}@testovic.cz`
    this.password = params.password ?? 'TestTest123$'
  }

  register() {
    cy.visit('/sign-up').waitForSfx()

    this.getFirstNameInput().type(this.firstName)
    this.getLastNameInput().type(this.lastName)
    this.getEmailInput().type(this.email)
    this.getPasswordInput().type(this.password)
    this.getPasswordConfirmationInput().type(this.password)

    this.getSignUpButton().click()

    this.getMicroAccount().should('include.text', this.firstName)
    this.getMicroAccount().should('include.text', this.lastName)
  }

  login(params = {}) {
    cy.visit('/sign-in').waitForSfx()

    this.getEmailInput().type(params.email ?? this.email)
    this.getPasswordInput().type(params.password ?? this.password)
    this.getSignInButton().click()

    this.getMicroAccount().should('include.text', this.firstName)
    this.getMicroAccount().should('include.text', this.lastName)
  }

  logout() {
    cy.visit('/').waitForSfx()

    this.getLogoutButton().click()

    this.getMicroAccount().should('not.include.text', this.firstName)
    this.getMicroAccount().should('not.include.text', this.lastName)
  }

  createNewAddress() {
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

  getFirstNameInput() {
    return cy.get('input[name=firstName]')
  }

  getLastNameInput() {
    return cy.get('input[name=lastName]')
  }

  getEmailInput() {
    return cy.get('input[name=email]')
  }

  getPasswordInput() {
    return cy.get('input[name=password]')
  }

  getPasswordConfirmationInput() {
    return cy.get('input[name=passwordConfirmation]')
  }

  getSignUpButton() {
    return cy.get('[data-cy=sign-up]')
  }

  getSignInButton() {
    return cy.get('[data-cy=sign-in]')
  }

  getMicroAccount() {
    return cy.get('[data-cy=micro-account]')
  }

  getLogoutButton() {
    return cy.get('[data-cy=logout]')
  }
}
