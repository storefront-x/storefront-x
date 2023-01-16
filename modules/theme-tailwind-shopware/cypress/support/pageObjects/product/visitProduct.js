export default (data) => cy.visit(data.url_key).waitForSfx()
