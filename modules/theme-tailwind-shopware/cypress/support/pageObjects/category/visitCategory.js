export default function visitCategory(category) {
  return cy.visit(category).waitForSfx()
}
