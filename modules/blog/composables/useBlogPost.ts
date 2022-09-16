import ToBlogPost from '#ioc/mappers/ToBlogPost'
import { computed, reactive, Ref } from 'vue'
import MAGENTO_URL from '#ioc/config/MAGENTO_URL'

export default (post: Ref<ReturnType<typeof ToBlogPost>>) => {
  const id = computed(() => post.value.id)

  const title = computed(() => post.value.title)

  const urlKey = computed(() => post.value.urlKey)

  const shortContent = computed(() => post.value.shortContent)

  const status = computed(() => post.value.status)

  const fullContent = computed(() => post.value.fullContent)

  const publishedAt = computed(() => post.value.publishedAt)

  const postThumbnail = computed(() => MAGENTO_URL + post.value.postThumbnail)

  const listThumbnail = computed(() => MAGENTO_URL + post.value.listThumbnail)

  const metaTitle = computed(() => post.value.meta.title)

  const metaDescription = computed(() => post.value.meta.description)

  return reactive({
    id,
    title,
    urlKey,
    shortContent,
    status,
    fullContent,
    publishedAt,
    postThumbnail,
    listThumbnail,
    metaTitle,
    metaDescription,
  })
}
