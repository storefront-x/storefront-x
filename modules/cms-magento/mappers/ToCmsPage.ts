import sanitizePageBuilderContent from '#ioc/utils/magento/sanitizePageBuilderContent'

export default (data: any) => ({
  content: sanitizePageBuilderContent(data.content),
  title: data.title ?? '',
  meta: {
    title: data.meta_title || data.title,
    description: data.meta_description ?? '',
    keywords: data.meta_keywords ?? '',
  },
})
