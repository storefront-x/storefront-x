<template>
  <div>
    <div class="opener flex items-center" :class="headingClass" @click="handleOpen">
      <slot name="heading" />

      <OutlineChevronRight
        :class="{ 'rotate-90': isOpened, 'transition-all': true, 'text-gray-500': true, ...iconClass }"
      />
    </div>
    <Transition
      appear
      enter-active-class="transition-height duration-300"
      enter-from-class="h-0"
      enter-to-class="h-100"
    >
      <div v-show="isOpened" class="content" :class="contentClass">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script>
import OutlineChevronRight from '#ioc/icons/OutlineChevronRight'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    OutlineChevronRight,
  },

  props: {
    headingClass: {
      required: false,
      type: Array,
      default: () => [],
    },
    iconClass: {
      type: Object,
      default: () => ({}),
    },
    contentClass: {
      type: Array,
      default: () => [],
    },
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isOpened: this.open,
    }
  },

  methods: {
    handleOpen() {
      this.isOpened = !this.isOpened
    },
  },
})
</script>
