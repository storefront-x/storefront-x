<template>
  <component :is="headingType" :style="styles">
    {{ headingText }}
  </component>
</template>

<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbHeading from '#ioc/mixins/IsPbHeading'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [IsPbBlock, IsPbHeading],

  computed: {
    styles() {
      return {
        ...this.advanced,
      }
    },
  },
})
</script>
