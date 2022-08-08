export default () => (data: any) => ({
  id: data.id as string,
  title: data.title as string,
  firstName: data.firstName as string,
  lastName: data.lastName as string,
  countryStateId: data.countryStateId as string,
  regionId: data.regionId as string,
  countryId: data.countryId as string,
  salutationId: data.salutationId as string,
  city: data.city as string,
  street: data.street as string,
  zipcode: data.zipcode as number,
  phoneNumber: data.phoneNumber as string,
})
