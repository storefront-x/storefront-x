import ToBlogPost from '#ioc/mappers/ToBlogPost'
import { computed, reactive, Ref } from 'vue'

export default (post: Ref<ReturnType<typeof ToBlogPost>>) => {
  const id = computed(() => post.value.id)

  const title = computed(() => post.value.title)

  const urlPath = computed(() => '/blog/' + post.value.urlKey)

  const shortContent = computed(() => post.value.shortContent)

  const status = computed(() => post.value.status)

  const fullContent = computed(() => post.value.fullContent)

  const publishedAt = computed(() => post.value.publishedAt)

  const postThumbnail = computed(() => post.value.postThumbnail)

  const listThumbnail = computed(() => post.value.listThumbnail)

  const metaTitle = computed(() => post.value.meta.title)

  const metaDescription = computed(() => post.value.meta.description)

  const metaKeywords = computed(() => post.value.meta.keywords)

  return reactive({
    id,
    title,
    urlPath,
    shortContent,
    status,
    fullContent,
    publishedAt,
    postThumbnail,
    listThumbnail,
    metaTitle,
    metaDescription,
    metaKeywords,
  })
}
