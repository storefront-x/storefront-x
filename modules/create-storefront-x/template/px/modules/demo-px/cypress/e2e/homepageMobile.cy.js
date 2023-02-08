import openHamburgerMenu from '~/cypress/support/pageObjects/hamburgerMenu/openHamburgerMenu'
import closeHamburgerMenu from '~/cypress/support/pageObjects/hamburgerMenu/closeHamburgerMenu'
import selectDifferentStoreOnMobile from '~/cypress/support/pageObjects/storeSwitcher/selectDifferentStoreOnMobile'

describe('Homepage', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
    cy.visit('/').waitForSfx()
  })

  it('opens and closes hamburger menu', () => {
    openHamburgerMenu()
    closeHamburgerMenu()
  })

  it('switches stores', () => {
    selectDifferentStoreOnMobile()
  })
})
