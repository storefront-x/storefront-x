import openHamburgerMenu from '~/cypress/support/pageObjects/hamburgerMenu/openHamburgerMenu'

export default () => {
  openHamburgerMenu()
  cy.get('[data-cy=store-switcher-mobile]')
    .invoke('text')
    .waitForSfx()
    .then((originalStore) => {
      cy.get('[data-cy=store-switcher-mobile]').click({ multiple: true })
      cy.get('[data-cy=store-switcher-mobile] a:last-child').click()
      cy.waitForSfx()

      // We dont need to close it because switching stores reloads page thus closing hamburger menu
      openHamburgerMenu()
      cy.get('[data-cy=store-switcher-mobile]').invoke('text').should('not.equal', originalStore)
    })
}
