<template>
  <div class="py-4" :style="advanced">
    <div class="inline-block" :style="styles" />
  </div>
</template>

<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbDivider from '#ioc/mixins/IsPbDivider'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [IsPbBlock, IsPbDivider],

  computed: {
    styles() {
      return {
        height: this.thickness,
        backgroundColor: this.color,
        width: this.width,
      }
    },
  },
})
</script>
