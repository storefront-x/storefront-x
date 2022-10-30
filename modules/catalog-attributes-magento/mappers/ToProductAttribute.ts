import ToProductAttributeOption from '#ioc/mappers/ToProductAttributeOption'

export default (data: any) => ({
  code: data?.attribute_code || '',
  label: data?.frontend_label.toUpperCase() || '',
  value: data?.value || '',
  valueLabel: String(data.value ?? '')
    .split(',')
    .map(toValueLabel(data))
    .join(', '),
  options: data?.attribute_options?.map(ToProductAttributeOption) ?? [],
})

function toValueLabel(attr: any) {
  return (value: any) => {
    const optionValue = (attr?.attribute_options ?? []).find(
      (o: any) => String(o.options_id) === String(value),
    )?.option_value
    return String(optionValue ?? '') ? optionValue : value
  }
}
