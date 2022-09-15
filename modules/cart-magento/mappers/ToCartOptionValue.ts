export default (data: any) => ({
  id: data.customizable_option_value_uid ?? '',
  label: data.label ?? '',
})
