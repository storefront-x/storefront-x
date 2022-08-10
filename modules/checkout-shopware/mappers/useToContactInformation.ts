import useToCountry from '#ioc/mappers/useToCountry'
import useToSalutation from '#ioc/mappers/useToSalutation'

export default () => {
  const toSalutation = useToSalutation()
  const toCountry = useToCountry()

  return (data: any) => ({
    email: data.email as string,
    firstName: data.firstName as string,
    lastName: data.lastName as string,
    city: data.city as string,
    street: data.street as string,
    zipcode: data.zipcode as string,
    salutation: toSalutation(data.salutation),
    country: toCountry(data.country),
  })
}
