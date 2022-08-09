export default () => (data: any) => ({
  name: data.category_name ?? '',
  urlPath: `/c/${data.id}`,
})
