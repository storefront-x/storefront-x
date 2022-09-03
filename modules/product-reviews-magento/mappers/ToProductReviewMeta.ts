export default (data: any) => ({
  id: data.id ?? '',
  name: data.name ?? '',
  values: Object.assign(
    {},
    ...data.values.map(({ value, value_id }: { value: any; value_id: string }) => ({
      [value]: { valueId: value_id },
    })),
  ),
})
