export default () => (data: any) => ({
  name: data.category_name ?? '',
  urlPath: `/${data.category_url_path}.html`, // TODO: Make '.html' suffix configurable
})
