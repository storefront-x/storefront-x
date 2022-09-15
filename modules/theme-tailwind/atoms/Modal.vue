<template>
  <Teleport to="body">
    <div class="fixed z-40 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:py-0 min-h-screen">
        <transition
          appear
          appear-active-class="transition duration-300 ease-out"
          appear-from-class="opacity-0"
          appear-class="opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="isOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" @click="close" />
        </transition>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle" aria-hidden="true">&#8203;</span>

        <transition
          appear
          appear-active-class="transition duration-300 ease-out"
          appear-from-class="transform translate-y-8 sm:translate-y-0 sm:scale-75"
          appear-to-class="transform opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="transform opacity-0 translate-y-8 sm:translate-y-0 sm:scale-75"
          @after-leave="afterLeave"
        >
          <div
            v-if="isOpen"
            class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl sm:my-8 sm:align-middle h-full sm:p-6"
            :class="classes"
          >
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue'

const props = defineProps({
  hasCloseBtn: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl'>,
    default: 'lg',
  },
})

const emit = defineEmits(['close'])

const isOpen = ref(true)

const classes = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'max-w-sm'
    case 'md':
      return 'max-w-md'
    case 'lg':
      return 'max-w-lg'
    case '2xl':
      return 'max-w-2xl'
    case '4xl':
      return 'max-w-4xl'
    default:
      return 'max-w-lg'
  }
})

const close = () => {
  isOpen.value = false
}

const afterLeave = () => {
  emit('close')
}

defineExpose({ close })
</script>
