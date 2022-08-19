<template>
  <Prose>
    <div :style="styles" v-html="innerHtml" />
  </Prose>
</template>

<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbText from '#ioc/mixins/IsPbText'
import { defineComponent } from 'vue'
import Prose from '#ioc/atoms/Prose'

export default defineComponent({
  components: {
    Prose,
  },

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
