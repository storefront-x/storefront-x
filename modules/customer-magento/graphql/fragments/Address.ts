import field from '#ioc/graphql/field'

export default () => ({
  id: field(),
  firstname: field(),
  lastname: field(),
  country_code: field(),
  region_id: field(),
  region: field({
    region_code: field(),
    region: field(),
  }),
  city: field(),
  street: field(),
  postcode: field(),
  telephone: field(),
  default_shipping: field(),
  default_billing: field(),
})
