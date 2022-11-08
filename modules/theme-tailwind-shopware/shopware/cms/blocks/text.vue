<template>
  <div v-if="shopwareCmsBlock.hasChildren" class="relative bg-center" :style="shopwareCmsBlock.styles">
    <slot name="default" />
  </div>
  <div v-else class="flex-full z-10 w-full" :style="shopwareTextCmsBlock.alignSelf">
    <div v-html="shopwareTextCmsBlock.content ?? ''"></div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
})
</script>

<script setup lang="ts">
import useShopwareCmsBlock from '#ioc/composables/useShopwareCmsBlock'
import { defineComponent } from 'vue'
import useShopwareCmsTextBlock from '#ioc/composables/useShopwareCmsTextBlock'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  section: {
    type: Object,
    default: () => ({}),
  },
})

const shopwareCmsBlock = useShopwareCmsBlock(props)
const shopwareTextCmsBlock = useShopwareCmsTextBlock(props)
</script>

<style scoped>
.flex-full {
  flex: 0 0 100%;
}
</style>
