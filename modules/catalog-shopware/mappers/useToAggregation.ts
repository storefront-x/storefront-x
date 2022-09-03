export default () => (data: any) => ({
  attributeCode: data.name ?? data.translated.name,
  label: data.name ?? data.translated.name,
  options: data.options.map((option: any) => ({
    label: option.name ?? option.translated.name,
    value: option.id ?? option.translated.id,
  })),
})
