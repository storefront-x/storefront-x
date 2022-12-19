<template>
  <div class="relative inline-block">
    <div v-click-outside="close" class="flex">
      <button
        :disabled="isDisabled"
        type="button"
        class="group inline-flex justify-center items-center"
        :class="{ 'hover:underline': linkLike, 'font-medium': !linkLike }"
        :aria-expanded="isOpen"
        aria-haspopup="true"
        @click="toggle"
      >
        <slot name="title">
          <span class="flex space-x-2">
            {{ title }}
          </span>
        </slot>

        <SolidArrowDown v-show="!isOpen" class="flex-shrink-0 -mr-1 ml-1 h-5 w-5" />
        <SolidArrowUp v-show="isOpen" class="flex-shrink-0 -mr-1 ml-1 h-5 w-5" />
      </button>
    </div>

    <Transition
      appear
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="origin-top-right absolute mt-2 py-1 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        :class="toLeft ? 'right-0' : 'left-0'"
      >
        <slot v-bind="{ close }" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import vClickOutside from '#ioc/directives/vClickOutside'
import SolidArrowUp from '#ioc/icons/SolidArrowUp'
import SolidArrowDown from '#ioc/icons/SolidArrowDown'
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: '',
  },
  toLeft: {
    type: Boolean,
    default: false,
  },
  linkLike: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
})

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}
</script>
