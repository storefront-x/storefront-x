export default () => {
  return (data: any) => ({
    id: data.brandId ?? 0,
    name: data.label ?? '',
    urlKey: data.url ?? '',
    description: data.description ?? '',
    image: data.image ?? '',
  })
}
