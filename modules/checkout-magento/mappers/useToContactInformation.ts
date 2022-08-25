export default () => (data: any) => ({
  email: data.email as string,
  telephone: data.telephone as string,
  firstName: data.firstname as string,
  lastName: data.lastname as string,
  street: data.street as string,
  city: data.city as string,
  countryCode: (data.country_code ?? data.country?.code) as string,
  postcode: data.postcode as string,
})
