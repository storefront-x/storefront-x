import GetRandomBlogCategory from '~/cypress/support/repositories/GetRandomBlogCategory'

export default () => {
  return GetRandomBlogCategory()
    .as('randomBlogCategory')
    .then((blogCategory) => {
      return cy.visit('/blog/category/' + blogCategory.url_key).waitForSfx()
    })
}
