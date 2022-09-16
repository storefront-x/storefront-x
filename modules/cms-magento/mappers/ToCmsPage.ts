import sanitizePageBuilderContent from '#ioc/utils/magento/sanitizePageBuilderContent'

export default (data: any) => ({
  content: sanitizePageBuilderContent(data.content),
  title: data.title ?? '',
  metaTitle: data.meta_title ?? '',
  metaDescription: data.meta_description ?? '',
  metaKeywords: data.meta_keywords ?? '',
})
