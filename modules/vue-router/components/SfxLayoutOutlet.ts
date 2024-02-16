import { defineComponent, h, Suspense } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'SfxLayoutOutlet',
  setup: () => {
    console.log('object')
    return () => h(Suspense, {}, { default: () => h(RouterView) })
  },
})
