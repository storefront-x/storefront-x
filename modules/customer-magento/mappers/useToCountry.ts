import useToCountryRegion from '#ioc/mappers/useToCountryRegion'

export default () => {
  const toCountryRegion = useToCountryRegion()
  return (data: any) => ({
    id: data.id ?? '',
    fullNameEnglish: data.full_name_english ?? '',
    fullNameLocale: data.full_name_locale ?? '',
    availableRegions: data?.available_regions?.map(toCountryRegion) ?? [],
  })
}
