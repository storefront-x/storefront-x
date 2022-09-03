export default (data: any) => ({
  city: data.city as string,
  countryCode: data.country_id as string,
  description: data.description as string,
  email: data.email as string,
  latitude: data.latitude as string,
  longitude: data.longitude as string,
  name: data.name as string,
  phone: data.phone as string,
  pickupLocationCode: data.pickup_location_code as string,
  postcode: data.postcode as string,
  street: data.street as string,
})
