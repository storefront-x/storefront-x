import ToCartOptionValue from '#ioc/mappers/ToCartOptionValue'

export default (data: any) => ({
  id: data.customizable_option_uid ?? '',
  label: data.label ?? '',
  values: data.values?.map(ToCartOptionValue),
})
