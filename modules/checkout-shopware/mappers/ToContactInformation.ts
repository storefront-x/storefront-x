import ToCountry from '#ioc/mappers/ToCountry'
import ToSalutation from '#ioc/mappers/ToSalutation'

export default (data: any) => ({
  email: data.email as string,
  firstName: data.firstName as string,
  lastName: data.lastName as string,
  city: data.city as string,
  street: data.street as string,
  zipcode: data.zipcode as string,
  salutation: ToSalutation(data.salutation),
  country: ToCountry(data.country),
})
