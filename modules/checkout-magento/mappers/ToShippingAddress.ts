export default (data: any) => ({
  telephone: data.telephone as string,
  firstName: data.firstname as string,
  lastName: data.lastname as string,
  street: data.street?.[0] as string,
  city: data.city as string,
  countryCode: (data.country_code ?? data.country?.code) as string,
  postcode: data.postcode as string,
  pickupLocationCode: data.pickup_location_code as string | null,
  customerNotes: data.customer_notes as string | null,
})
