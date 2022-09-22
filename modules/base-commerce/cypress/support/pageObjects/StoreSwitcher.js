import HamburgerMenu from './HamburgerMenu'

export default class StoreSwitcher {
  constructor() {
    this.hamburgerMenu = new HamburgerMenu()
  }

  selectDifferentStore() {
    cy.get('[data-cy=store-switcher]')
      .invoke('text')
      .then((originalStore) => {
        cy.get('[data-cy=store-switcher]').click()
        cy.get('[data-cy=store-switcher] a:last-child').click()

        cy.get('[data-cy=store-switcher]').invoke('text').should('not.equal', originalStore)
      })
  }

  selectDifferentStoreOnMobile() {
    this.hamburgerMenu.open()
    cy.get('[data-cy=store-switcher-mobile]')
      .invoke('text')
      .then((originalStore) => {
        cy.get('[data-cy=store-switcher-mobile]').click({ multiple: true })
        cy.get('[data-cy=store-switcher-mobile] a:last-child').click()

        // We dont need to close it because switching stores reloads page thus closing hamburger menu
        this.hamburgerMenu.open()
        cy.get('[data-cy=store-switcher-mobile]').invoke('text').should('not.equal', originalStore)
      })
  }
}
