import useToPost from '#ioc/mappers/useToPost'
import { computed, reactive, Ref } from 'vue'

export default (post: Ref<ReturnType<ReturnType<typeof useToPost>>>) => {
  const id = computed(() => post.value.id)

  const title = computed(() => post.value.title)

  const urlKey = computed(() => post.value.urlKey)

  const shortContent = computed(() => post.value.shortContent)

  const status = computed(() => post.value.status)

  const fullContent = computed(() => post.value.fullContent)

  const publishedAt = computed(() => post.value.publishedAt)

  const postThumbnail = computed(() => post.value.postThumbnail)

  const listThumbnail = computed(() => post.value.listThumbnail)

  const metaTitle = computed(() => post.value.metaTitle)

  const metaDescription = computed(() => post.value.metaDescription)

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
