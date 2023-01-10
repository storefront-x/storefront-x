<template>
  <div :style="styles" v-html="innerHtml" />
</template>

<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbText from '#ioc/mixins/IsPbText'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [IsPbBlock, IsPbText],

  computed: {
    styles() {
      return {
        ...this.advanced,
      }
    },
  },
})
</script>
