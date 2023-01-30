import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'ClientOnly',

  inheritAttrs: false,

  setup(_, { slots }) {
    const mounted = ref(false)

    onMounted(() => {
      mounted.value = true
    })

    return () => {
      if (mounted.value) {
        return slots.default?.()
      } else if (slots.fallback) {
        return slots.fallback()
      } else {
        return null
      }
    }
  },
})
