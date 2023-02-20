import sanitizePageBuilderContent from '#ioc/utils/magento/sanitizePageBuilderContent'

export default (data: any) => ({
  content: sanitizePageBuilderContent(data.content?.html ?? ''),
})
