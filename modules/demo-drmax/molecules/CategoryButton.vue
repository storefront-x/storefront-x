<template>
  <Link
    :to="localePath(category.urlPath)"
    class="bg-white p-2 rounded-md transition ease-in-out delay-75 hover:no-underline"
  >
    <span class="flex flex-row my-1 items-center">
      <figure class="image-wrapper">
        <SfxImage
          v-if="hasImage"
          :src="category.thumbnailUrl"
          class=""
          class-img="rounded-full"
          width="50"
          height="50"
          fit="cover"
          :alt="category.name"
        />
      </figure>

      <span class="ml-3 leading-5 text-[18px] font-semibold text-blue-560 hover:text-red-555 hover:underline">
        <span>{{ category.name }}</span>
      </span>

      <span v-if="hasCount" class="text-gray-400 pl-1 ml-auto">({{ props.category.productsTotalCount }})</span>
    </span>
  </Link>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import SfxImage from '#ioc/components/SfxImage'
import useCategory from '#ioc/composables/useCategory'
import useLocalePath from '#ioc/composables/useLocalePath'
import ToCategory from '#ioc/mappers/ToCategory'
import { computed, PropType, toRef } from 'vue'

const props = defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof ToCategory>>,
    required: true,
  },
})

const localePath = useLocalePath()
const category = useCategory(toRef(props, 'category'))

const hasImage = computed(() => {
  return !!category.thumbnailUrl
})

const hasCount = computed(() => {
  return props.category.productsTotalCount > 0
})
</script>
<style scoped>
.image-wrapper {
  @apply flex w-[64px] relative justify-center items-center rounded-full max-w-full shrink-0;
}
.image-wrapper:before {
  display: block;
  content: '';
  padding-bottom: 100%;
}

.image-wrapper:after {
  content: '';
  box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 50%);
  @apply block absolute left-0 right-0 top-0 bottom-0 m-auto rounded-[inherit];
}
</style>
