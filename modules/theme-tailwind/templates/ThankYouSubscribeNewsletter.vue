<template>
  <Container class="max-w-xl py-16">
    <h1 class="uppercase tracking-wide text-primary-600" data-cy="thank-you">
      {{ t('thankYou') }}
    </h1>
    <p class="mt-2 text-2xl font-extrabold tracking-tight">{{ t('newsLetterSubscribed') }}</p>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import useI18n from '#ioc/composables/useI18n'
import useRoute from '#ioc/composables/useRoute'
import useConfirmSubscriptionToNewsletter from '#ioc/services/useConfirmSubscriptionToNewsletter'
import { onMounted } from 'vue'

const { t } = useI18n()
const route = useRoute()
const confirmSubscriptionToNewsletter = useConfirmSubscriptionToNewsletter()

onMounted(async () => {
  await confirmSubscriptionToNewsletter({
    id: String(route.params.id),
    code: String(route.params?.code ?? '').replace('/', ''),
  })
})
</script>

<i18n lang="yaml">
cs-CZ:
  thankYou: Děkujeme!
  newsLetterSubscribed: Úspěšně jste se přihlásili k odběru newsletteru.
en-US:
  thankYou: Thank you!
  newsLetterSubscribed: You are subscribed to our newsletter.
</i18n>
