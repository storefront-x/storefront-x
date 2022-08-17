<template>
  <div :class="classes" :style="styles">
    <slot />
  </div>
</template>

<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbButtons from '#ioc/mixins/IsPbButtons'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [IsPbBlock, IsPbButtons],

  computed: {
    classes() {
      return {
        'flex gap-2': true,
        'flex-row': this.appearance === 'inline',
        'flex-col': this.appearance === 'stacked',
        'justify-start': this.advanced.textAlign === 'left',
        'justify-center': this.advanced.textAlign === 'center',
        'justify-end': this.advanced.textAlign === 'right',
      }
    },

    styles() {
      return {
        ...this.advanced,
        textAlign: undefined,
      }
    },
  },
})
</script>
