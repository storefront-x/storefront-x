export default (data: any) => ({
  count: data.count ?? 0,
  label: data.label ?? '',
  value: data.value ?? '',
})
