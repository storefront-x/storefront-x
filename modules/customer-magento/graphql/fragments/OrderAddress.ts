import field from '#ioc/graphql/field'

export default () => ({
  prefix: field(),
  firstname: field(),
  lastname: field(),
  suffix: field(),
  city: field(),
  company: field(),
  country_code: field(),
  fax: field(),
  postcode: field(),
  region: field(),
  region_id: field(),
  street: field(), // array
  telephone: field(),
})
