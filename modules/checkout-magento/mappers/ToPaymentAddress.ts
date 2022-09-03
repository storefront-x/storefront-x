export default (data: any) => ({
  telephone: data.telephone as string,
  firstName: data.firstname as string,
  lastName: data.lastname as string,
  street: data.street?.[0] as string,
  city: data.city as string,
  countryCode: (data.country_code ?? data.country?.code) as string,
  postcode: data.postcode as string,
})
