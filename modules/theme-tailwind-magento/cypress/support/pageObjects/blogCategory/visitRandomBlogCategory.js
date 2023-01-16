import GetRandomBlogCategory from '~/cypress/support/repositories/GetRandomBlogCategory'

export default () => {
  return GetRandomBlogCategory().then((blogCategory) => {
    return cy.visit('/blog/category/' + blogCategory.url_key).waitForSfx()
  })
}
