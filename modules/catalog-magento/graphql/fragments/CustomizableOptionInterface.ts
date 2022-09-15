import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import on from '#ioc/graphql/on'
import CustomizableOption from '#ioc/graphql/fragments/CustomizableOption'

export default (name = 'customizableOptionInterface') =>
  fragment(name, 'CustomizableOptionInterface', {
    required: field(),
    sort_order: field(),
    title: field(),
    option_id: field(),
    ...on('CustomizableRadioOption', {
      ...CustomizableOption(),
    }),
    ...on('CustomizableCheckboxOption', {
      ...CustomizableOption(),
    }),
    ...on('CustomizableMultipleOption', {
      ...CustomizableOption(),
    }),
    ...on('CustomizableDropDownOption', {
      ...CustomizableOption(),
    }),
  })
