<template>
  <Teleport to="body">
    <div class="fixed inset-0 flex z-20 lg:hidden" role="dialog" aria-modal="true" v-bind="$attrs">
      <div class="relative w-full h-full">
        <Transition
          appear
          enter-active-class="transition-opacity ease-linear duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity ease-linear duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="open" class="absolute inset-0 bg-black bg-opacity-25" aria-hidden="true" @click="close" />
        </Transition>

        <Transition
          appear
          enter-active-class="transform ease-in-out duration-300"
          :enter-from-class="from === 'left' ? '-translate-x-full' : 'translate-x-full'"
          enter-to-class="translate-x-0"
          leave-active-class="transform ease-in-out duration-300"
          leave-from-class="translate-x-0"
          :leave-to-class="from === 'left' ? '-translate-x-full' : 'translate-x-full'"
          @after-leave="afterLeave"
        >
          <div
            v-if="open"
            class="relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto"
            :class="{ 'ml-auto': from === 'right' }"
          >
            <div v-if="!disableTitleSlot" class="px-4 flex items-center justify-between">
              <h2 v-if="title" class="text-lg font-medium text-gray-900">{{ title }}</h2>
              <button
                type="button"
                class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                @click="close"
              >
                <span class="sr-only">Close menu</span>
                <OutlineX />
              </button>
            </div>

            <slot />
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import useBlockBodyFromScrolling from '#ioc/composables/useBlockBodyFromScrolling'
import OutlineX from '#ioc/icons/OutlineX'
import { PropType, ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: null,
  },
  from: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  disableTitleSlot: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits(['close'])

useBlockBodyFromScrolling()

const open = ref(true)

const close = () => {
  open.value = false
}

const afterLeave = () => {
  emit('close')
}

defineExpose({ close })
</script>
