<template>
  <div
    class="rounded-lg whitespace-nowrap px-2 pb-px bg-gray-500 text-white font-semibold text-xs"
    :style="label.style"
  >
    {{ t(label.text) }}
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
defineProps({
  label: {
    type: Object,
    default: null,
  },
})
const { t } = useI18n()
</script>
<i18n lang="yaml">
en-US:
  Novinka: New item
cs-CZ:
  Novinka: Novinka
</i18n>
