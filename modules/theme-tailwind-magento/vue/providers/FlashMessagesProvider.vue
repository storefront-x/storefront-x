<template>
  <slot />
</template>

<script setup lang="ts">
import useFlashMessages from '#ioc/composables/useFlashMessages'
import useShowNotification from '#ioc/composables/useShowNotification'
import useI18n from '#ioc/composables/useI18n'
import { onMounted } from 'vue'

const flashMessages = useFlashMessages()
const showNotification = useShowNotification()
const { t, te } = useI18n()

onMounted(() => {
  const messages = flashMessages.get()

  for (const messageObject of messages) {
    const { type, title, message } = messageObject
    const notificationOptions = type === 'ERROR' ? { timeout: 0 } : {}
    const translationTargetTitle = getTranslationTarget(type, title)
    const translationTargetMessage = getTranslationTarget(type, message)
    const notificationTitle = title
      ? te(translationTargetTitle)
        ? t(translationTargetTitle)
        : title
      : t(getTranslationTarget(type))
    const notificationMessage = te(translationTargetMessage) ? t(translationTargetMessage) : message

    showNotification(notificationTitle, notificationMessage, type, notificationOptions)
  }
})

function getTranslationTarget(type: string, message?: string) {
  if (!message) return `${type === 'ERROR' ? 'errors.title' : ''}`
  return `${type === 'ERROR' ? 'errors' : ''}["${message}"]`
}
</script>
