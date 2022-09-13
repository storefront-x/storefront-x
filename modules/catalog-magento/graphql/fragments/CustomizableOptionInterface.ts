import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import on from '#ioc/graphql/on'

export default (name = 'customizableOptionInterface') =>
  fragment(name, 'CustomizableOptionInterface', {
    required: field(),
    sort_order: field(),
    title: field(),
    uid: field(),
    ...on('CustomizableRadioOption', {
      __typename: field(),
      value: field({
        option_type_id: field(),
        price: field(),
        price_type: field(),
        sku: field(),
        title: field(),
        uid: field(),
      }),
    }),
    ...on('CustomizableCheckboxOption', {
      __typename: field(),
      value: field({
        option_type_id: field(),
        price: field(),
        price_type: field(),
        sku: field(),
        title: field(),
        uid: field(),
      }),
    }),
    ...on('CustomizableMultipleOption', {
      __typename: field(),
      value: field({
        option_type_id: field(),
        price: field(),
        price_type: field(),
        sku: field(),
        title: field(),
        uid: field(),
      }),
    }),
    ...on('CustomizableDropDownOption', {
      __typename: field(),
      value: field({
        option_type_id: field(),
        price: field(),
        price_type: field(),
        sku: field(),
        title: field(),
        uid: field(),
      }),
    }),
  })
