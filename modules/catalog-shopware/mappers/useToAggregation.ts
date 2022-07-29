export default () => (data: any) => ({
  attributeCode: data.name,
  label: data.name,
  options: data.options.map((option: any) => ({
    label: option.name,
    value: option.id,
  })),
})
