<template>
  <div class="flex items-center" :class="isInPagination ? 'md:hidden max-w-fit' : ''">
    <Link href="#" class="flex space-x-2" tag="a" @click.prevent="backToTop">
      <OutlineChevronUp width="16" height="18" :class="classes" />
      <span v-if="isInPagination" class="text-black text-base">{{ t('To top') }}</span>
      <span v-else>{{ t('Back to Top') }}</span>
    </Link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Link from '#ioc/atoms/Link'
import OutlineChevronUp from '#ioc/icons/OutlineChevronUp'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()

const props = defineProps({
  isInPagination: {
    type: Boolean,
    default: false,
  },
})

const classes = computed(() => (props.isInPagination ? 'fill-black' : 'fill-primary-500 p-1 rounded-full border'))

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<i18n lang="yaml">
cs-CZ:
  Back to Top: Zpět nahoru
  To top: Nahoru
</i18n>
