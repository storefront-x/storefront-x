/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    waitForSfx(): Chainable<any>
    will: Chainer<Subject>
    withinIframe(locator: string): Chainable<any>
  }
}
