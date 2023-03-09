import Newsletter from '#ioc/molecules/Newsletter'

describe('Newsletter', () => {
  it('renders', () => {
    cy.mount(Newsletter, {
      slots: {
        default: 'Click me!',
      },
    })

    cy.get('button').click()
  })
})
