export default (data: any) => ({
  key: data.key as string,
  priority: data.priority as number,
  label: (data.label ?? data.translated.label) as string,
})
