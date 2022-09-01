<template>
  <Link
    :to="to"
    class="bg-white border border-gray-400 p-2 rounded-md transition ease-in-out delay-75 hover:no-underline"
  >
    <div class="flex flex-row my-1 items-center">
      <SfxImage
        v-if="hasImage"
        class="mr-2"
        :src="thumbnail" 
        class-img="h-6 w-6 rounded-full border-1"
        fit="contain"
      />
      <div class="leading-5 sm truncate whitespace-nowrap overflow-hidden">
        <slot class="text-xl font-semibold text-black" />
      </div>
      <span v-if="hasCount" class="text-gray-400 pl-1 ml-auto">({{ count }})</span>
    </div>
  </Link>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link';
import SfxImage from '#ioc/components/SfxImage'
import { computed } from '@vue/reactivity';


const props = defineProps({
  thumbnail: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '#',
    required: true,
  },
  count: {
    type: Number,
    default: null,
  },
})

const hasImage = computed(() => {
  return props.thumbnail !== null && props.thumbnail !== '';
})
const hasCount = computed(() => {
  return props.count !== null && props.count !== 0;
})
</script>
