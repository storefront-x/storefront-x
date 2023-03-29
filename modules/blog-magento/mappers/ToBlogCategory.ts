export default (data: any) => ({
  urlKey: data.url_key ?? '',
  name: data.name ?? '',
  id: data.category_id,
  postCount: data.post_count ?? 0,
  parentId: data.parent_id ?? null,
  meta: {
    title: data.meta_title || data.name,
    description: data.meta_description ?? '',
    keywords: data.meta_keyword ?? '',
  },
})
