<template>
  <a
    :href="`https://www.facebook.com/sharer/sharer.php?u=${location}`"
    class="flex ml-2 mr-4 text-gray-400 cursor-pointer no-underline hover:bg-gray-100"
    target="_blank"
  >
    <OutlineArrowShare class="ml-2 mr-1 text-gray-400" /> {{ t('Share') }}
  </a>
</template>

<script setup lang="ts">
import OutlineArrowShare from '#ioc/icons/OutlineArrowShare'
import useRoute from '#ioc/composables/useRoute'
import useI18n from '#ioc/composables/useI18n'
import { onMounted, ref } from 'vue'

const route = useRoute()
const { t } = useI18n()
const location = ref(route.fullPath)

onMounted(() => {
  location.value = window.location.href
})
</script>

<i18n lang="yaml">
cs-CZ:
  Share: Sdílet
</i18n>
