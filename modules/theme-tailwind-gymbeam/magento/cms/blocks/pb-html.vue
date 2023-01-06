<template>
  <div :style="styles" v-html="innerHtml" />
</template>

<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbHtml from '#ioc/mixins/IsPbHtml'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [IsPbBlock, IsPbHtml],

  computed: {
    styles() {
      return {
        ...this.advanced,
      }
    },
  },
})
</script>
