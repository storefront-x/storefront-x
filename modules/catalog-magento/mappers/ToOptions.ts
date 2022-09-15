import ToOptionsValue from '#ioc/mappers/ToOptionsValue'

export default (data: any) => ({
  __typename: data.__typename,
  id: data.uid,
  required: data.required,
  sortOrder: data.sort_order,
  title: data.title,
  value: (data.value ?? []).map(ToOptionsValue),
})
