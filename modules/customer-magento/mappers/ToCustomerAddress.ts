export default (data: any) => ({
  id: data.id ?? 0,
  firstName: data.firstname ?? '',
  lastName: data.lastname ?? '',
  countryCode: data.country_code ?? '',
  regionId: data.region_id ?? '',
  city: data.city ?? '',
  street: data.street.join(' ') ?? [''],
  zipcode: data.postcode ?? '',
  phoneNumber: data.telephone ?? '',
  defaultShipping: data.default_shipping ?? false,
  defaultBilling: data.default_billing ?? false,
})
