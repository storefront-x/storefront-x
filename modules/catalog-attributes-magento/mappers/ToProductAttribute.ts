import ToProductAttributeOption from '#ioc/mappers/ToProductAttributeOption'
import capitalizeFirstLetter from '#ioc/utils/string/capitalizeFirstLetter'

export default (data: any) => ({
  code: data?.attribute_code || '',
  label: capitalizeFirstLetter(data?.frontend_label) || '',
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
