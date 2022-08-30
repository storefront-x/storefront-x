import { computed, reactive } from 'vue'

export default (productReview: any) => {
  const summary = computed(() => productReview.summary)

  const text = computed(() => productReview.text)

  const nickname = computed(() => productReview.nickname)

  const createdAt = computed(() => productReview.createdAt)

  const averageRating = computed(() => productReview.averageRating)

  return reactive({
    summary,
    text,
    nickname,
    createdAt,
    averageRating,
  })
}
