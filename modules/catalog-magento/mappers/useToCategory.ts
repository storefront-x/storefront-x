export default () => (data: any) => ({
  id: data.id ?? 0,
  urlPath: `/c/${data.id}`,
  name: data.name ?? '',
  description: data.description ?? '',
  thumbnailUrl: data.thumbnail ? '/media/catalog/category/' + data.thumbnail : data.thumbnail,
  breadcrumbs: [],
  productsTotalCount: data.products?.total_count ?? 0,
})
