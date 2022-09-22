export default (data: any) => ({
  urlKey: data.url_key ?? '',
  name: data.name ?? '',
  id: data.category_id,
  postCount: data.post_count ?? 0,
  parentId: data.parent_id ?? null,
  metaTitle: data.meta_title ?? '',
  metaDescription: data.meta_description ?? '',
})
