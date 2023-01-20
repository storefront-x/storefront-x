<template>
  <div class="flex flex-col" :class="classes" :style="styles">
    <div :style="{ textAlign: _textAlign }">
      <div class="p-4 max-w-full" v-html="pbBanner.content" />
      <RouterLink v-if="pbBanner.showButton === 'always'" class="btn btn-primary" :to="localePath(pbBanner.link)">
        {{ pbBanner.buttonText }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePbBanner from '#ioc/composables/cms/usePbBanner'
import useLocalePath from '#ioc/composables/useLocalePath'
import { computed } from 'vue'

const props = defineProps({ el: { type: Object, default: null } })

const localePath = useLocalePath()
const pbBanner = usePbBanner(props.el)

const classes = computed(() => {
  return {
    'justify-center': pbBanner.appearance === 'poster',
  }
})

const styles = computed(() => {
  return {
    ...pbBanner.advanced,
    ...pbBanner.background,
    minHeight: pbBanner.minHeight,
  }
})

const _textAlign = computed(() => {
  if (pbBanner.appearance === 'collage-left') return 'left'
  if (pbBanner.appearance === 'collage-centered') return 'center'
  if (pbBanner.appearance === 'collage-right') return 'right'
  return undefined
})
</script>
