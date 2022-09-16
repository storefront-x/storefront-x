import toDate from '#ioc/utils/date/toDate'
import sanitizePageBuilderContent from '#ioc/utils/magento/sanitizePageBuilderContent'

export default (data: any) => ({
  id: data.post_id,
  urlKey: data.url_key ?? '',
  title: data.title ?? '',
  shortContent: data.short_content ?? '',
  status: data.status ?? '',
  fullContent: { content: sanitizePageBuilderContent(data.full_content) },
  publishedAt: toDate(data.published_at),
  postThumbnail: useOriginalImage(data.post_thumbnail ?? ''),
  listThumbnail: useOriginalImage(data.list_thumbnail ?? ''),
  meta: {
    title: data.meta_title ?? '',
    description: data.meta_description ?? '',
  },
})

const useOriginalImage = (url: string) => {
  return url.replace(/\/cache\/.+?\/.+?\/.+?\/.+?\//, '/')
}
