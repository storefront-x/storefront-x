import ToCountryRegion from '#ioc/mappers/ToCountryRegion'

export default (data: any) => ({
  id: data.id ?? '',
  fullNameEnglish: data.full_name_english ?? '',
  fullNameLocale: data.full_name_locale ?? '',
  availableRegions: data?.available_regions?.map(ToCountryRegion) ?? [],
})
