<template>
  <Component
    :is="tag"
    :to="to"
    :href="href"
    class="border whitespace-nowrap rounded-md shadow-sm py-2 px-4 flex items-center font-bold justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="classes"
    :disabled="disabled"
    :title="title"
  >
    <slot />
  </Component>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'light',
    },
    to: {
      type: null,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    outline: Boolean,
    loading: Boolean,
  },

  computed: {
    classes() {
      return {
        ...this.getColorClasses(),
        'opacity-50 cursor-not-allowed': this.disabled,
        'cursor-wait': this.loading,
        'cursor-pointer': !this.loading && !this.disabled,
      }
    },

    tag() {
      if (this.to) return 'RouterLink'
      if (this.href) return 'a'
      return 'button'
    },
  },

  methods: {
    getColorClasses() {
      switch (this.color) {
        case 'light':
          return {
            'focus:ring-primary-500': true,
            'bg-white': !this.outline,
            'hover:bg-gray-50': !this.disabled,
          }
        case 'primary':
          return {
            'focus:ring-primary-500': true,
            'border-transparent bg-primary-600 text-white': !this.outline,
            'hover:bg-primary-700': !this.outline && !this.disabled,
            'border-primary-600 bg-white text-primary-600': this.outline,
            'hover:bg-primary-600 hover:text-white': this.outline && !this.disabled,
          }
        case 'error':
          return {
            'focus:ring-red-500': true,
            'border-transparent bg-red-600 text-white': !this.outline,
            'hover:bg-red-700': !this.outline && !this.disabled,
            'border-red-600 bg-white text-red-600': this.outline,
            'hover:bg-red-600 hover:text-white': this.outline && !this.disabled,
          }
        default:
          return {}
      }
    },
  },
})
</script>

<style scoped>
.cursor-wait::before {
  border-radius: 9999px;
  border-width: 2px;
  height: 1rem;
  margin-right: 0.5rem;
  width: 1rem;
  animation: spin 2s linear infinite;
  content: '';
  border-color: transparent currentColor currentColor transparent;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
